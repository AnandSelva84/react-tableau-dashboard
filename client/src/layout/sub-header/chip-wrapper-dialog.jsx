import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Chip, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useData from "../../hooks/useStore";
import { continuesFilter } from "../../redux/methods/continous-filter";
import { applyFilters } from "../../redux/actions/shared";
import SearchBar from "../../components/search-bar/search-bar";
import { PropTypes } from "prop-types";

const ChipsWrapper = (props) => {
  const dispatch = useDispatch();
  const [deleteCases, setDeleteCases] = React.useState(0);
  const [loaded, setLoaded] = React.useState(0);
  const { appliedFilters } = useData().sharedReducer;

  const chipsAfterSearch = props.values.filter((value) =>
    value.value
      .toLocaleLowerCase()
      .includes(props.searchValue.toLocaleLowerCase())
  );

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  const onFilterEnd = (filters) => {
    dispatch(applyFilters([...filters]));
  };

  const onDelete = (ID) => {
    dispatch(applyFilters([...appliedFilters.filter((f) => f.ID !== ID)]));
  };

  React.useEffect(() => {
    if (loaded) continuesFilter(appliedFilters, onFilterEnd);
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
                label={value.value}
                style={{
                  marginRight: "0.4rem",
                  // backgroundColor: colors.usaa_blue,
                  marginTop: "0.2rem",
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
            style={{ backgroundColor: "rgb(171,8,14)", color: "#fff" }}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </>
  );
};

ChipsWrapper.propTypes = {
  values: PropTypes.any,
  searchValue: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.any,
  handleTextChange: PropTypes.func,
  title: PropTypes.string,
};

export default ChipsWrapper;
