import React from "react";
import { Snackbar as Snack } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Snackbar = () => {
  const [open, setOpen] = React.useState(false);

  const closeSncak = () => {};

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    alert("closed");
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClick}>Up</Button>
      <Snack
        open={open}
        onClose={handleClose}
        // TransitionComponent={SlideTransition}
        message="I love snacks"
        key={"notiKey"}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snack>
    </>
  );
};

export default Snackbar;
