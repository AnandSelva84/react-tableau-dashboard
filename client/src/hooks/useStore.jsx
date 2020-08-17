import { useSelector } from "react-redux";

const useData = () => {
  const state = useSelector((_state) => _state);
  return state;
};

export default useData;
