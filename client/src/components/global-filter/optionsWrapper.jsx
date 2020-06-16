import React from "react";
import { Paper } from "@material-ui/core";

const OptionsWrapper = (props) => {
  const [loaded, setLoaded] = React.useState();

  React.useEffect(() => {
    setLoaded(true);
    if (loaded) props.onMenuHasLoaded();
  }, [loaded]);

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
      >
        {props.children}
      </Paper>
    </>
  );
};

export default OptionsWrapper;
