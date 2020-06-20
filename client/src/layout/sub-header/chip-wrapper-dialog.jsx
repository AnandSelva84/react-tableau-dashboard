import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Chip, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useData from "../../hooks/useStore";
import { continuesFilter } from "../../redux/methods/continous-filter";
import { applyFilters } from "../../redux/actions/shared";
import SearchBar from "../../components/search-bar/search-bar";

const ChipsWrapper = (props) => {
  const dispatch = useDispatch();
  const [deleteCases, setDeleteCases] = React.useState(0);
  const { filterState, appliedFilters } = useData().sharedReducer;
  const createChip = (id, value) => `${id} : ${value}`;

  const chipsAfterSearch = props.values.filter((value) =>
    createChip(props.title, value.value)
      .toLocaleLowerCase()
      .includes(props.searchValue.toLocaleLowerCase())
  );

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

  const onFilterEnd = (filters) => {
    dispatch(applyFilters([...filters]));
  };

  const onDelete = (ID) => {
    debugger;
    const afterFilter = [...appliedFilters.filter((f) => f.ID !== ID)];
    dispatch(applyFilters([...appliedFilters.filter((f) => f.ID !== ID)]));
  };

  React.useEffect(() => {
    continuesFilter(appliedFilters, onFilterEnd);
  }, [deleteCases]);

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
            padding: "1rem 1.5rem",
          }}
        >
          <SearchBar onChange={props.handleTextChange} />
          <div
            className=""
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {chipsAfterSearch.map((value) => (
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
                  onDelete(value.ID);
                  setDeleteCases(deleteCases + 1);
                }}
              />
            ))}
          </div>
        </div>
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "3.5rem",
            marginBottom: "1.5rem",
          }}
          onClick={() => {
            props.onClose();
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            style={{ color: "#fff" }}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default ChipsWrapper;
