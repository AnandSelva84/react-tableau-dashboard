import React from "react";
import { InputBase, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = (props) => {
  return (
    <Paper
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
    </Paper>
  );
};

export default SearchBar;
