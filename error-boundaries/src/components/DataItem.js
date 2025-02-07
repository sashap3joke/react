import { getData } from "../api";

function DataItem() {
  const data = getData(); // This could throw an error depending on mock implementation in tests.
  return (
    <div className="data">
      <p>
        <b>Data received:</b>
      </p>
      <div>{data}</div>
    </div>
  );
}

export default DataItem;
