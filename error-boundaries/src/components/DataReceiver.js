import { useState } from "react";
import { getData } from "../api";

function DataReceiver() {
  const [data, setData] = useState(0);
  const [error, setError] = useState(null);

  const handleClick = () => {
    try {
      const result = getData(); // This will throw an error
      setData(result);
      setError(null); // Clear any previous errors if successful
    } catch (err) {
      setError(err.message); // Capture the error message, but don't rethrow it
    }
  };

  return (
    <div className="data">
      <button onClick={handleClick}>Get new data</button>
      {error ? (
        <div role="alert">
          <p>Error: {error}</p>
          <button onClick={handleClick}>Try again</button>
        </div>
      ) : (
        <div>{data}</div>
      )}
    </div>
  );
}

export default DataReceiver;

