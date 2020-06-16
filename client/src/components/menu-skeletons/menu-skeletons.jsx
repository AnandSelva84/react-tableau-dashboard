import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const MenuSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="rect"
        style={{ minHeight: "2.625rem" }}
        animation="wave"
      />
      <hr />
      <Skeleton
        variant="rect"
        style={{ minHeight: "2.625rem" }}
        animation="wave"
      />
      <hr />
      <Skeleton
        variant="rect"
        style={{ minHeight: "2.625rem" }}
        animation="wave"
      />
    </>
  );
};

export default MenuSkeleton;
