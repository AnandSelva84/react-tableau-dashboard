import React from "react";
import { Paper, Chip, createStyles, makeStyles } from "@material-ui/core";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import { addFilter, deleteFilter } from "../../redux/actions/shared";
import { isExist } from "../../redux/methods/is-exist";
import theme from "../../theme/layout";
import "./sub-header.css";

const SubHeader = () => {
  const { filters, filterState } = useData().sharedReducer;
  const dispatch = useDispatch();
  const createChip = (id, value) => `${id} : ${value}`;
  const isVisiable = filterState.length > 0;

  //in case you delete a parent without child
  //filter the cildren that have no parent exitst
  React.useEffect(() => {}, [filterState]);

  const handleClick = (id, value) => {
    !isExist(filterState, id, value)
      ? dispatch(addFilter({ id, value }))
      : dispatch(deleteFilter({ id, value }));
  };

  return (
    <div style={{ minHeight: "3.5rem" }}>
      {isVisiable && (
        <Paper
          style={{
            ...theme.subHeader,
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
      )}
    </div>
  );
};

export default SubHeader;
