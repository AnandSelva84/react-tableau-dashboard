import React from "react";
import { InputBase, Card } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { PropTypes } from "prop-types";

const SearchBar = (props) => {
  return (
    <Card
      style={{
        minHeight: "2rem",
        padding: "0.5rem 0.5rem",
        marginBottom: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        ...props?.style,
      }}
    >
      <InputBase placeholder="Filters Search" {...props} fullWidth />
      <SearchIcon />
    </Card>
  );
};

SearchBar.propTypes = {
  style: PropTypes.any,
};

export default SearchBar;
