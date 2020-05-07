import React from "react";
import "./laoding.css";
import { CircularProgress } from "@material-ui/core";

const Loading = () => (
  <div className="loading">
    <CircularProgress />
  </div>
);

export default Loading;
