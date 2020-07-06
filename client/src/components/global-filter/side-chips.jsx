import React from "react";
import { Chip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteFilter, editFilterState } from "../../redux/actions/shared";
import { continuesFilter } from "../../redux/methods/continous-filter";

const SideChips = (props) => {
  const { chips = [] } = props;
  const afterCut = chips.slice(0, 2);
  const dispatch = useDispatch();
  console.log("side chips", chips);

  const handleDelete = (chip) => {
    dispatch(deleteFilter({ ...chip }));
  };

  console.log("chip len", props.chips);

  //after delete check the number of chips as an event
  const length = chips.length - 2;

  return (
    <>
      <div className="" style={{ display: "flex", alignItems: "center" }}>
        {afterCut.map((chip) => (
          <Chip
            style={{ fontSize: "0.7rem" }}
            label={chip.value}
            onDelete={() => {
              handleDelete(chip);
            }}
          />
        ))}
        {props.chips.length > 2 && (
          <div className="">+{props.chips.length - 2}</div>
        )}
      </div>
    </>
  );
};

export default SideChips;
