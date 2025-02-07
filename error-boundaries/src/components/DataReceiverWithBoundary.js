import React from "react";
import DataReceiver from "./DataReceiver";
import ErrorBoundary from "./ErrorBoundary";

function DataReceiverWithBoundary() {
  return (
    <ErrorBoundary>
      <DataReceiver />
    </ErrorBoundary>
  );
}

export default DataReceiverWithBoundary;
