import React from "react";
import { Snackbar as Snack } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import { showMessage } from "../../redux/actions/shared";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Snackbar = () => {
  const dispatch = useDispatch();

  const { snack } = useData().sharedReducer;

  const { open, msg, varient } = snack;

  // const [open, setOpen] = React.useState(false);

  const closeSncak = () => {
    dispatch(showMessage("", "", false));
  };

  const handleClick = () => {
    dispatch(showMessage("this is message ", "error", true));
  };
  const handleClose = () => {
    closeSncak();
  };

  return (
    <>
      <Button onClick={handleClick}>Up</Button>
      <Snack
        open={open}
        onClose={handleClose}
        // TransitionComponent={SlideTransition}
        message={msg}
        key={"notiKey"}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={varient}>
          {msg}
        </Alert>
      </Snack>
    </>
  );
};

export default Snackbar;
