import React from "react";
import { Paper } from "@material-ui/core";
import { PropTypes } from "prop-types";

const OptionsWrapper = (props) => {
  React.useEffect(() => {
    return () => {
      props.onClose();
    };
  }, []);

  return (
    <>
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxHeight: "15rem",
          overflowY: "auto",
          position: "absolute",
          top: "4.5rem",
          minWidth: "100%",
          zIndex: "100",
        }}
        onScroll={() => {
          props.onScroll();
        }}
      >
        {props.children}
      </Paper>
    </>
  );
};

OptionsWrapper.propTypes = {
  children: PropTypes.any,
  onScroll: PropTypes.func,
  onClose: PropTypes.func,
};

export default OptionsWrapper;
