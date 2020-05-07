import React, { useState, useEffect } from "react";

export default function useFetch(url, method) {
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
    } catch (error) {
      setLoading(false);
      serError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);
  return { data, loading, error };
}
