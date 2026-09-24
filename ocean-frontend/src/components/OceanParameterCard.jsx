import React from "react";
const OceanParameterCard = ({
  title,
  value,
  unit,
  icon,
}) => {
  return (
    <div className="parameter-card">
      <div className="parameter-icon">
        {icon}
      </div>

      <div>
        <p>{title}</p>

        <h3>
          {value !== null && value !== undefined
            ? Number(value).toFixed(2)
            : "--"}

          <span>{unit}</span>
        </h3>
      </div>
    </div>
  );
};

export default OceanParameterCard;