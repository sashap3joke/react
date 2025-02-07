// components/EntityDetails.js
import React from "react";
import withLoading from "./withLoading";

function EntityDetails({ data, propsToDisplay }) {
  return (
    <div className="center">
      <h3>{data.name} Details:</h3>
      {Object.entries(propsToDisplay).map(([key, label]) => (
        <div key={key}>
          {label}: <strong>{data[key]}</strong>
        </div>
      ))}
    </div>
  );
}

export default withLoading(EntityDetails);
