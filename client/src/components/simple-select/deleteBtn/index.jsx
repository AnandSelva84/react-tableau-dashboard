import React from "react";
import { IconButton } from "@material-ui/core";
import { Remove } from "@material-ui/icons";

export default function DeleteBtn(props) {
  return (
    <>
      <div
        {...props}
        style={{ position: "absolute", right: "5px", top: "20px" }}
      >
        <IconButton>
          <Remove />
        </IconButton>
      </div>
    </>
  );
}
