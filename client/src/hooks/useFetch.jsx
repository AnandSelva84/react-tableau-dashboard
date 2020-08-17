import { useState, useEffect } from "react";

export default function useFetch(url, method, deps) {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, serError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const rawResponse = await fetch(url, { method });
      const response = await rawResponse.json();
      setLoading(false);

      setData(response);
    } catch (_error) {
      setLoading(false);
      serError(_error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [deps]);
  return { data, loading, error };
}
