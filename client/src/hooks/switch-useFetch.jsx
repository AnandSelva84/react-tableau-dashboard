import React, { useState, useEffect } from "react";

export default function useSwitchFetch(url, switchCase = false) {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, serError] = useState("");

  const fetchData = async () => {
    debugger
    setLoading(true);
    try {
      const rawResponse = await fetch(url);
      const response = await rawResponse.json();
      setLoading(false);

      setData(response);
    } catch (error) {
      setLoading(false);
      serError(error);
    }
  };

  useEffect(() => {
    if (!!switchCase) fetchData();
  }, [url, switchCase]);
  return { data, loading, error };
}
