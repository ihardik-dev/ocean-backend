import logging
import os
import tempfile
import zipfile
from datetime import date, datetime, time

import numpy as np
import xarray as xr
from dotenv import load_dotenv


load_dotenv()


MULTIYEAR_DATASET_ID = "cmems_mod_glo_phy_my_0.083deg_P1D-m"
FORECAST_DATASET_ID = "cmems_mod_glo_phy_anfc_0.083deg_PT1H-m"
SURFACE_VARIABLES = ["thetao", "so", "zos", "uo", "vo"]
LOCAL_SAMPLE_HALF_WIDTH_DEGREES = float(
    os.getenv("COPERNICUSMARINE_LOCAL_SAMPLE_HALF_WIDTH_DEGREES", "0.125")
)
logger = logging.getLogger(__name__)


class ProviderError(RuntimeError):
    """A failure from a named upstream data provider."""

    def __init__(self, provider: str, message: str):
        super().__init__(message)
        self.provider = provider


def _first_env(*names: str) -> str | None:
    """Return the first non-empty environment value, supporting old names."""
    return next((os.getenv(name) for name in names if os.getenv(name)), None)


def _marine_dataset_candidates() -> list[tuple[str, bool]]:
    """Prefer the live forecast, then fall back to the historical reanalysis.

    A single COPERNICUSMARINE_DATASET_ID is still supported for deployments
    that deliberately pin a product.  The boolean says whether depth bounds
    are valid for that dataset.
    """
    configured_dataset = os.getenv("COPERNICUSMARINE_DATASET_ID")
    if configured_dataset:
        return [(configured_dataset, configured_dataset == MULTIYEAR_DATASET_ID)]

    return [
        (
            _first_env("COPERNICUSMARINE_FORECAST_DATASET_ID")
            or FORECAST_DATASET_ID,
            False,
        ),
        (
            _first_env("COPERNICUSMARINE_MULTIYEAR_DATASET_ID")
            or MULTIYEAR_DATASET_ID,
            True,
        ),
    ]


def _value(dataset, variable):
    if variable not in dataset:
        raise ValueError(f"Copernicus response is missing variable '{variable}'")

    data = dataset[variable].squeeze(drop=True)
    if data.size == 0:
        raise ValueError(f"Copernicus response contains no values for '{variable}'")

    values = np.asarray(data.values, dtype=float)
    valid_values = values[np.isfinite(values)]
    if valid_values.size == 0:
        raise ValueError(
            f"Copernicus variable '{variable}' has no valid value at this point"
        )

    # A small bounding box can straddle a grid edge or a masked cell.  Use the
    # valid local values rather than treating the first returned cell as the
    # requested point.
    return float(valid_values.mean())


def _mean_value(dataset, variables):
    for variable in variables:
        if variable in dataset:
            data = dataset[variable].squeeze(drop=True)
            if data.size == 0:
                break
            values = np.asarray(data.values, dtype=float)
            valid_values = values[np.isfinite(values)]
            if valid_values.size:
                return float(valid_values.mean())

    names = ", ".join(variables)
    raise ValueError(f"ERA5 response is missing variables: {names}")


def fetch_wind_data(requested_date: date, lat: float, lon: float):
    try:
        import cdsapi
    except ImportError as exc:
        raise ProviderError(
            "CDS/ERA5",
            "The CDS API package is missing. Run: "
            "python -m pip install -r requirements.txt",
        ) from exc

    api_key = os.getenv("CDS_API_KEY")
    if not api_key:
        raise ProviderError(
            "CDS/ERA5",
            "CDS API credentials are not configured. Set CDS_API_KEY."
        )

    start = requested_date.isoformat()
    request = {
        "location": {"longitude": lon, "latitude": lat},
        "date": [f"{start}/{start}"],
        "variable": [
            "10m_u_component_of_wind",
            "10m_v_component_of_wind",
        ],
        "data_format": "netcdf",
    }

    with tempfile.TemporaryDirectory() as output_directory:
        output_path = os.path.join(output_directory, "wind.nc")
        client = cdsapi.Client(
            url=os.getenv("CDS_API_URL", "https://cds.climate.copernicus.eu/api"),
            key=api_key,
        )
        try:
            client.retrieve(
                "reanalysis-era5-single-levels-timeseries",
                request,
                output_path,
            )
        except Exception as exc:
            raise ProviderError(
                "CDS/ERA5", f"wind retrieval failed: {exc}"
            ) from exc

        dataset_path = output_path
        if zipfile.is_zipfile(output_path):
            extract_directory = os.path.join(output_directory, "extracted")
            with zipfile.ZipFile(output_path) as archive:
                archive.extractall(extract_directory)

            netcdf_files = [
                os.path.join(extract_directory, name)
                for name in os.listdir(extract_directory)
                if name.lower().endswith((".nc", ".nc4"))
            ]
            if not netcdf_files:
                raise ValueError("CDS response archive contains no NetCDF file")
            dataset_path = netcdf_files[0]

        with xr.open_dataset(dataset_path, engine="netcdf4") as dataset:
            return {
                "wind_u": _mean_value(
                    dataset,
                    ["u10", "10m_u_component_of_wind"],
                ),
                "wind_v": _mean_value(
                    dataset,
                    ["v10", "10m_v_component_of_wind"],
                ),
            }


def _download_marine_dataset(
    copernicusmarine,
    dataset_id: str,
    has_depth_axis: bool,
    requested_date: date,
    lat: float,
    lon: float,
    username: str,
    password: str,
):
    start = datetime.combine(requested_date, time.min).isoformat()
    request = {
        "dataset_id": dataset_id,
        "variables": SURFACE_VARIABLES,
        # Copernicus grid cells are about 1/12°.  A 0.01° box can contain
        # only a masked cell at a grid edge; include nearby cells instead.
        "minimum_longitude": max(-180.0, lon - LOCAL_SAMPLE_HALF_WIDTH_DEGREES),
        "maximum_longitude": min(
            179.9166717529297, lon + LOCAL_SAMPLE_HALF_WIDTH_DEGREES
        ),
        "minimum_latitude": max(-80.0, lat - LOCAL_SAMPLE_HALF_WIDTH_DEGREES),
        "maximum_latitude": min(90.0, lat + LOCAL_SAMPLE_HALF_WIDTH_DEGREES),
        "start_datetime": start,
        "end_datetime": start,
        "username": username,
        "password": password,
    }
    if has_depth_axis:
        request.update(
            minimum_depth=0.49402499198913574,
            maximum_depth=0.49402499198913574,
        )

    with tempfile.TemporaryDirectory() as output_directory:
        response = copernicusmarine.subset(
            **request,
            output_directory=output_directory,
            output_filename="surface.nc",
        )
        # Toolbox 2.x returns the actual output path.  It may choose a
        # service-specific filename instead of the requested output name.
        output_path = os.fspath(response.file_path)
        if not os.path.exists(output_path):
            raise ValueError(
                f"Copernicus Marine reported an output that does not exist: {output_path}"
            )

        with xr.open_dataset(output_path) as dataset:
            return {
                "sst": _value(dataset, "thetao"),
                "sss": _value(dataset, "so"),
                "ssh": _value(dataset, "zos"),
                "current_u": _value(dataset, "uo"),
                "current_v": _value(dataset, "vo"),
            }


def fetch_surface_data(requested_date: date, lat: float, lon: float):
    try:
        import copernicusmarine
    except ImportError as exc:
        raise ProviderError(
            "Copernicus Marine",
            "The Copernicus Marine package is missing. Run: "
            "python -m pip install -r requirements.txt",
        ) from exc

    username = _first_env(
        "COPERNICUSMARINE_SERVICE_USERNAME", "COPERNICUSMARINE_USERNAME"
    )
    password = _first_env(
        "COPERNICUSMARINE_SERVICE_PASSWORD", "COPERNICUSMARINE_PASSWORD"
    )
    if not username or not password:
        raise ProviderError(
            "Copernicus Marine",
            "Copernicus credentials are not configured. Set "
            "COPERNICUSMARINE_SERVICE_USERNAME and "
            "COPERNICUSMARINE_SERVICE_PASSWORD."
        )

    failures = []
    for dataset_id, has_depth_axis in _marine_dataset_candidates():
        try:
            values = _download_marine_dataset(
                copernicusmarine,
                dataset_id,
                has_depth_axis,
                requested_date,
                lat,
                lon,
                username,
                password,
            )
            values.update(fetch_wind_data(requested_date, lat, lon))
            return values
        except ProviderError:
            raise
        except Exception as exc:
            logger.warning(
                "Copernicus Marine dataset %s could not satisfy the request",
                dataset_id,
                exc_info=True,
            )
            failures.append(f"{dataset_id}: {exc}")

    raise ProviderError(
        "Copernicus Marine",
        "no configured dataset could supply this date/location. " + "; ".join(failures),
    )
