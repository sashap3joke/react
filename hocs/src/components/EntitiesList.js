// components/EntitiesList.js
import React from "react";
import withLoading from "./withLoading";

function EntitiesList({ data, propsToDisplay }) {
  return (
    <ul>
      {data.map((entity) => (
        <li key={entity.id}>
          <button onClick={() => alert(`Viewing details for ${entity.name}`)}>
            👀
          </button>
          <span>
            {propsToDisplay.name}: <strong>{entity.name}</strong>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default withLoading(EntitiesList);
