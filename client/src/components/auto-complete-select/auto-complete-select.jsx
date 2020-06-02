import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Checkbox } from "@material-ui/core";
import { CheckBoxOutlineBlank, CheckBox } from "@material-ui/icons";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > * + *": {
        marginTop: theme.spacing(3),
      },
    },
  })
);

//there is two reasons for selecting
//select-option
//clear

export const Select = (props) => {
  const classes = useStyles();
  console.log("auto", props);
  const [selectedState, setselectedState] = React.useState(false);

  const getValues = () => {
    return props.filterState.filter((value) => value.id === props.title);
  };
  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBox fontSize="small" />;

  const isChecked = (option) => {
    if (!!props.filterState) {
      return !!props.filterState.find(
        (elem) => elem.value === option.filter_display_text
      );
    } else {
      return false;
    }
  };

  return (
    <div style={{ padding: "1rem 0rem" }}>
      <Autocomplete
        {...props}
        id="checkboxes-tags-demo"
        options={props.options}
        disableCloseOnSelect
        getOptionLabel={(option) => "option.filter_display_text"}
        renderOption={(option, { selected }) => {
          return (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={isChecked(option)}
                onChange={(e) => {
                  console.log("from change", option);
                }}
              />
              {"option.filter_display_text"}
            </React.Fragment>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={"props.title"}
            placeholder="Favorites"
          />
        )}
      />
    </div>
  );
};
