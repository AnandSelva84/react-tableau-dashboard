import React from "react";
import "./popover.css";
import { Paper } from "@material-ui/core";

const Popover = (props) => {
  const [show, setShow] = React.useState(false);

  const handleOpen = () => setShow(true);

  const handleClose = () => setShow(false);

  return (
    <div className="pop-over" onMouseOver={handleOpen} onMouseOut={handleClose}>
      <>{props.children}</>
      {show && (
        <Paper
          style={{
            position: "absolute",
            top: 40,
            minWidth: "10rem",
            zIndex: 5000,
            left: "-50%",
            padding: "0.5rem 1rem",
            right: "-50%",
            transform: `translate(-50%, -50%)`,
            fontSize: "0.8rem"
          }}
        >
          {props ?.content || ""}

        </Paper>
      )}
    </div>
  );
};

export default Popover;
