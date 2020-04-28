import React from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  const query = new URLSearchParams(useLocation().search);
  return query;
  //   query.get('value')
};

export default useQuery;
