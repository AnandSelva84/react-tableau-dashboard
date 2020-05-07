import React from "react";
import { useSelector } from "react-redux";

const useData = () => {
  const state = useSelector((state) => state);
  return state;
};

export default useData;
