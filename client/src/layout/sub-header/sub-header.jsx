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
import {
  reFormat,
  getPossibleChoicesToFill,
} from "../../redux/methods/re-format-response";

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
  const chosenIds = filterState.map((filter) => filter.ID) || [];

  const addFilter = (id, value, lvl, ID, parentId) => {
    dispatch(addFilter({ id, value, lvl, ID, parentId }));
  };

  //in case you delete a parent without child
  //filter the cildren that have no parent exitst
  React.useEffect(() => {
    if (!!newFilters) {
      newFilters.forEach((newFilter) => {
        const ids = console.log(
          getPossibleChoicesToFill(newFilters, chosenIds)
        );
      });
    }
  }, [newFilters]);

  const handleClick = (id, value, lvl) => {
    dispatch(deleteFilter({ id, value, lvl }));
  };

  const isApplied = (ID) => {
    // console.log("applied are ", appliedFilters);
    // console.log("applied are ", appliedFilters);

    const color = !!appliedFilters.find((filter) => filter.ID === ID)
      ? "#80deea"
      : "";
    return color;
  };

  const hasParentTest = (parentId) => {
    let hasId = chosenIds.find((id) => id === parentId);
    if (hasId === 0) hasId = 1;
    return !!hasId;
  };

  const getOptions = (values, lvl) => {
    if (lvl === 5) console.log("in id get ", values);

    const options = values?.filter(
      (value) => hasParentTest(value?.parent_filter_option) || lvl === 1
    );
    return options;
  };

  const getChips = () => {
    if (filterState.length === 0) return appliedFilters;
    else return filterState;
  };

  const getMax = (id, lvl) => {
    //id in filter state is equal to filter.title iin newFilters

    const pureOptions = reFormat(newFilters);
    const options = pureOptions.filter(
      (value) => hasParentTest(value.parentFilterOptionId) || lvl === 0
    );
    // console.log("chips true posible options", options);

    return (
      newFilters.filter((filter) => filter.title === id)[0]?.values.length || 0
    );
  };

  const howManyRepeated = (id) => {
    return filterState.filter((filter) => filter.id === id)?.length || 0;
  };

  const checkCurrent = () => {
    const allChips = getChips();
    const pureOptions = reFormat(newFilters);

    newFilters.forEach((newFilter) => {
      // console.log(
      //   "id get Options",
      //   getOptions(newFilter.values, newFilter.level)
      // );
      // console.log("id get Options for id", newFilter.title);
    });

    let hasAll = [];
    allChips.forEach((value) => {
      // console.log("------------ -------");
      // console.log("chips possible for id ", value.id);
      // console.log("chips possible new chosen ", chosenIds);
      // console.log(
      //   "chips possible new filters after search ",
      //   newFilters
      //     .filter((filter) => filter.title === value.id)[0]
      //     ?.values.filter((filter) =>
      //       chosenIds.includes(filter.parent_filter_option)
      //     )
      // );
      // console.log("------------ -------");

      const possible =
        newFilters
          .filter((filter) => filter.title === value.id)[0]
          ?.values.filter((value) =>
            chosenIds.includes(value.parent_filter_option)
          )?.length || 0;

      // const chosenOne = newFilters.filter(
      //   (filter) => filter.title === value.id
      // )[0];

      const allpossobilesinNewFilter = newFilters.filter(
        (filter) => filter.title === value.id
      );

      const chosenOne = allpossobilesinNewFilter?.filter((po) =>
        po.values.map((val) => val.filter_value).includes(value.value)
      )[0];

      if (value.lvl === 4) {
        // console.log("how many of these chip", AnotherchosenOne);
        allpossobilesinNewFilter.filter((po) =>
          po.values.includes(value.value)
        );
        console.log(
          "how many of these",
          allpossobilesinNewFilter.filter((po) =>
            po.values.map((val) => val.filter_value).includes(value.value)
          )
        );
      }

      const newPossible = getOptions(chosenOne?.values, chosenOne?.level);

      // console.log("id get Options", newPossible);
      if (!!!newPossible) return;
      const match = howManyRepeated(value.id) === newPossible?.length;
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
    // console.log("chip array ids", idsThatHasAll);
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
