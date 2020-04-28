import React from "react";
import { Paper, Chip } from "@material-ui/core";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import { addFilter, deleteFilter } from "../../redux/actions/shared";

const SubHeader = () => {
  const { filters, filterState } = useData().sharedReducer;
  const dispatch = useDispatch();
  const createChip = (id, value) => `${id} : ${value}`;

  const isExist = (id, value) => {
    const idExist = filterState.find((filter) => filter.id === id);
    if (!!!idExist) return false;
    const valueExist = filterState.find((filter) => filter.value === value);
    if (!!!valueExist) return false;
    return true;
  };

  const handleClick = (id, value) => {
    !isExist(id, value)
      ? dispatch(addFilter({ id, value }))
      : dispatch(deleteFilter({ id, value }));
  };

  return (
    <Paper
      style={{
        padding: "0.5rem 1rem",
        margin: "0 0rem",
        minHeight: "3.5rem",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {filterState.map((filter) => (
        <Chip
          label={createChip(filter.id, filter.value)}
          style={{ marginRight: "0.4rem" }}
          onDelete={() => handleClick(filter.id, filter.value)}
        />
      ))}
    </Paper>
  );
};

export default SubHeader;
