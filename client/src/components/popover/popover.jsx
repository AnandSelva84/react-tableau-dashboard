import React from "react";
import "./popover.css";
import { Paper } from "@material-ui/core";
import { PropTypes } from "prop-types";

const Popover = (props) => {
  const [show, setShow] = React.useState(false);

  const handleOpen = () => setShow(true);

  const handleClose = () => setShow(false);

  const isDisabled = !props.disabeld;

  return (
    <div
      className="pop-over"
      style={{ cursor: isDisabled ? "default" : "pointer" }}
      onMouseOver={handleOpen}
      onMouseOut={handleClose}
    >
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
            fontSize: "0.8rem",
            backgroundColor: isDisabled ? "#D3D3D3" : "",
          }}
        >
          {props?.content || ""}
        </Paper>
      )}
    </div>
  );
};

Popover.propTypes = {
  disabeld: PropTypes.bool,
  children: PropTypes.any,
  content: PropTypes.any,
};

export default Popover;
