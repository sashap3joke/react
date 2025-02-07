import { ErrorBoundary } from "react-error-boundary";
import DataItem from "./DataItem";
import ErrorFallback from "./ErrorFallback";

function DataList() {
  return (
    <div>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // This will reset any error state for individual DataItems when "Try again" is clicked.
        }}
      >
        <DataItem />
      </ErrorBoundary>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // Reset logic if needed (although it's not necessary here since each DataItem is independent).
        }}
      >
        <DataItem />
      </ErrorBoundary>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // Similar reset logic for the third instance.
        }}
      >
        <DataItem />
      </ErrorBoundary>
    </div>
  );
}

export default DataList;
