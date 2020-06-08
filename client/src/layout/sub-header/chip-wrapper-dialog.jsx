import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Chip } from "@material-ui/core";

const ChipsWrapper = (props) => {
  const createChip = (id, value) => `${id} : ${value}`;

  const getChipId = (value) => {
    debugger;
    console.log(
      "chip ID",
      props.filterState.find((f) => f.id === props.title && f.value === value)
    );

    return (
      props.filterState.find((f) => f.id === props.title && f.value === value)
        ?.ID || null
    );
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
            minHeight: "35vh",
          }}
        >
          {props.values.map((value) => (
            <Chip
              label={createChip(props.title, value)}
              style={{
                marginRight: "0.4rem",
                //TODO make isApplied functional for mulitble and single values
                backgroundColor: props.isApplied(getChipId(value)),
                marginTop: "0.2rem",
                // cursor: isClickable(filter.value),
              }}
              onDelete={() => {
                props.onDelete(props.title, value, props.lvl);
              }}
            />
          ))}
        </div>
      </Dialog>
    </>
  );
};

export default ChipsWrapper;
