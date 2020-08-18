import React from "react";
import { Chip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteFilter } from "../../redux/actions/shared";
import { PropTypes } from "prop-types";

const SideChips = (props) => {
  const { chips = [] } = props;
  const afterCut = chips.slice(0, 2);
  const dispatch = useDispatch();

  const handleDelete = (chip) => {
    dispatch(deleteFilter({ ...chip }));
  };

  //after delete check the number of chips as an event
  const reformatLabel = (label = "") => {
    const _length = label.length;
    let toReturn = label;
    if (_length > 17) toReturn = label.slice(0, 17) + "...";
    return toReturn;
  };

  return (
    <>
      <div className="" style={{ display: "flex", alignItems: "center" }}>
        {afterCut.map((chip) => (
          <Chip
            key={Math.random()}
            style={{ fontSize: "0.57rem" }}
            label={reformatLabel(chip.value)}
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

SideChips.propTypes = {
  chips: PropTypes.any,
};

export default SideChips;
