import { useState, useEffect } from "react";

export function useLoading(fetchMethod, params = null) {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    fetchMethod(params).then((res) => {
      setData(res);
    });
  }, [fetchMethod, params]);

  return data;
}
