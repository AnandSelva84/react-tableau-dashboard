import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Chip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useData from "../../hooks/useStore";

const ChipsWrapper = (props) => {
  const dispatch = useDispatch();
  const { filterState } = useData().sharedReducer;

  const createChip = (id, value) => `${id} : ${value}`;

  const getChipId = (value) => {
    console.log(
      "chip ID",
      props.filterState.find((f) => f.id === props.title && f.value === value)
    );

    return (
      props.filterState.find((f) => f.id === props.title && f.value === value)
        ?.ID || null
    );
  };

  const isApplied = (ID) => {
    return !!filterState.find((f) => f.ID === ID)?.applied || false
      ? "#192734"
      : "";
  };

  return (
    <>
      <Dialog
        onClose={props.onClose}
        aria-labelledby="simple-dialog-title"
        open={props.open}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
        <div
          className=""
          style={{
            display: "flex",
            flexWrap: "wrap",
            padding: "1rem 1.5rem",
          }}
        >
          {props.values.map((value) => (
            <Chip
              // ID = {value.ID}
              label={createChip(props.title, value.value)}
              color={"primary"}
              style={{
                marginRight: "0.4rem",
                //TODO make isApplied functional for mulitble and single values
                backgroundColor: "#192734",
                marginTop: "0.2rem",
                // cursor: isClickable(filter.value),
              }}
              onDelete={() => {
                props.onDelete(props.title, value.value, props.lvl, value.ID);
              }}
            />
          ))}
        </div>
      </Dialog>
    </>
  );
};

export default ChipsWrapper;
