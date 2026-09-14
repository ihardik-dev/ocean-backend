from fastapi import APIRouter, Query, Depends, HTTPException
from pydantic import BaseModel, Field
from app.services.prediction_service import generate_prediction
from datetime import date
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.ocean_data import OceanData
from app.models.prediction import Prediction
from app.services.copernicus_service import ProviderError, fetch_surface_data

router = APIRouter()


class PredictionRequest(BaseModel):
    date: date
    lat: float = Field(..., ge=5, le=30)
    lon: float = Field(..., ge=45, le=105)

    sst: float
    sss: float
    ssh: float
    current_u: float
    current_v: float
    wind_u: float
    wind_v: float


@router.post("/predict")
def predict(
    request: PredictionRequest,
    db: Session = Depends(get_db)
):

    ocean_data = {
    "sst": request.sst,
    "sss": request.sss,
    "ssh": request.ssh,
    "current_u": request.current_u,
    "current_v": request.current_v,
    "wind_u": request.wind_u,
    "wind_v": request.wind_v
}

    result = generate_prediction(ocean_data)


    depths, temperature = result

    prediction = Prediction(
        date=request.date,
        lat=request.lat,
        lon=request.lon,
        depths=depths,
        temperature=temperature
    )

    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return {
        "id": prediction.id,
        "date": request.date,
        "lat": request.lat,
        "lon": request.lon,
        "depths": depths,
        "temperature": temperature
    }


@router.get("/ocean-data")
def ocean_data(
    date: date,
    lat: float = Query(..., ge=5, le=30),
    lon: float = Query(..., ge=45, le=105),
    refresh: bool = Query(False),
    db: Session = Depends(get_db)
):

    grid_lat = round(lat * 4) / 4
    grid_lon = round(lon * 4) / 4

    row = (
        db.query(OceanData)
        .filter(
            OceanData.date == date,
            OceanData.lat == grid_lat,
            OceanData.lon == grid_lon
        )
        .first()
    )

    if row is None or refresh:
        try:
            values = fetch_surface_data(date, grid_lat, grid_lon)
        except ProviderError as exc:
            raise HTTPException(
                status_code=502,
                detail=f"{exc.provider} data retrieval failed: {exc}",
            ) from exc
        except Exception as exc:
            raise HTTPException(
                status_code=502,
                detail=f"Unexpected ocean-data retrieval failure: {exc}",
            ) from exc

        if row is None:
            row = OceanData(
                date=date,
                lat=grid_lat,
                lon=grid_lon,
                **values,
            )
            db.add(row)
        else:
            for key, value in values.items():
                setattr(row, key, value)
        db.commit()
        db.refresh(row)

    return {
        "date": row.date,
        "lat": row.lat,
        "lon": row.lon,
        "sst": row.sst,
        "sss": row.sss,
        "ssh": row.ssh,
        "current_u": row.current_u,
        "current_v": row.current_v,
        "wind_u": row.wind_u,
        "wind_v": row.wind_v
    }


@router.post("/test-db")
def test_db(db: Session = Depends(get_db)):

    row = OceanData(
        date=date(2026, 9, 1),
        lat=15.0,
        lon=75.0,
        sst=28.5,
        sss=35.0,
        ssh=0.4,
        current_u=0.18,
        current_v=-0.07,
        wind_u=4.2,
        wind_v=-1.5
    )

    db.add(row)
    db.commit()
    db.refresh(row)

    return {
        "message": "Data saved to PostgreSQL",
        "id": row.id
    }
