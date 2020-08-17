import { useLocation } from "react-router-dom";

const useQuery = () => {
  const query = new URLSearchParams(useLocation().search);
  return query;
};

export default useQuery;
