// components/withLoading.js
import React, { useState, useEffect } from "react";

function withLoading(Component) {
  return function WrappedComponent({ fetchMethod, ...props }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      setData(null);

      // Ensure fetchMethod is called
      fetchMethod()
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch(() => {
          setData(null);
          setLoading(false);
        });
    }, [fetchMethod]);

    if (loading) {
      return <p className="center">Loading...</p>;
    }

    if (!data) {
      return <p className="center">No data available</p>;
    }

    return <Component data={data} {...props} />;
  };
}

export default withLoading;
