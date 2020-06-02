import React, { useState } from "react";
import {
  Paper,
  Chip,
  createStyles,
  makeStyles,
  TextField,
} from "@material-ui/core";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import { addFilter, deleteFilter } from "../../redux/actions/shared";
import { isExist } from "../../redux/methods/is-exist";
import theme from "../../theme/layout";
import "./sub-header.css";
import { Select } from "../../components/auto-complete-select/auto-complete-select";

const SubHeader = () => {
  const {
    filters,
    filterState,
    appliedFilters,
    newFilters,
  } = useData().sharedReducer;
  const dispatch = useDispatch();
  const createChip = (id, value) => `${id} : ${value}`;
  const isVisiable = filterState.length > 0;
  const [ids, setIds] = useState([]);

  //in case you delete a parent without child
  //filter the cildren that have no parent exitst
  React.useEffect(() => {}, [filterState]);

  const handleClick = (id, value, lvl) => {
    dispatch(deleteFilter({ id, value, lvl }));
  };

  const isApplied = (ID) => {
    console.log("applied are ", appliedFilters);
    console.log("applied are ", appliedFilters);

    const color = !!appliedFilters.find((filter) => filter.ID === ID)
      ? "#80deea"
      : "";
    return color;
  };

  const getChips = () => {
    if (filterState.length === 0) return appliedFilters;
    else return filterState;
  };

  const getMax = (id) => {
    //id in filter state is equal to filter.title iin newFilters
    return (
      newFilters.filter((filter) => filter.title === id)[0]?.values.length || 0
    );
  };

  const howManyRepeated = (id) => {
    return filterState.filter((filter) => filter.id === id)?.length || 0;
  };

  const checkCurrent = () => {
    const allChips = getChips();
    let hasAll = [];
    allChips.forEach((value) => {
      const match = howManyRepeated(value.id) === getMax(value.id);
      if (match) {
        if (!hasAll.find((filter) => filter.id === value.id))
          hasAll.push(value);
      }
    });

    return [...new Set([...hasAll])];
  };

  React.useEffect(() => {
    const idsThatHasAll = checkCurrent();
    setIds([...idsThatHasAll]);
    console.log("chip array ids", idsThatHasAll);
  }, [filterState]);

  const reFormatChips = () => {
    const pureIds = ids.map((value) => value.id);

    const afterFilter = getChips().filter(
      (filter) => !pureIds.includes(filter.id)
    );
    const afterIdsReformat = ids.map((filter) => ({
      ...filter,
      value: "All",
    }));
    return [...afterFilter, ...afterIdsReformat];
  };
  return (
    <div>
      {isVisiable && (
        <Paper
          style={{
            ...theme.subHeader,
          }}
        >
          <>{/* <Select options={["hello"]} /> */}</>
          {reFormatChips().map((filter) => (
            <Chip
              label={createChip(filter.id, filter.value)}
              style={{
                marginRight: "0.4rem",
                backgroundColor: isApplied(filter.ID),
                marginTop: "0.2rem",
              }}
              onDelete={() => {
                if (!!filter.lvl)
                  handleClick(filter.id, filter.value, filter.lvl);
              }}
            />
          ))}
        </Paper>
      )}
    </div>
  );
};

export default SubHeader;
