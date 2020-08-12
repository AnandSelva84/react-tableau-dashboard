import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       "& > * + *": {
//         marginTop: theme.spacing(3),
//       },
//     },
//   })
// );

export const Select = (props) => {
  // const icon = <CheckBoxOutlineBlank fontSize="small" />;
  // const checkedIcon = <CheckBox fontSize="small" />;

  // const isChecked = (option) => {
  //   if (!!props.filterState) {
  //     return !!props.filterState.find(
  //       (elem) => elem.value === option.filter_display_text
  //     );
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <div style={{ padding: "1rem 0rem" }}>
      <Autocomplete
        {...props}
        // id="checkboxes-tags-demo"
        // options={props.options}
        // disableCloseOnSelect
        // renderOption={(option) => {
        //   return (
        //     <React.Fragment>
        //       <Checkbox
        //         icon={icon}
        //         checkedIcon={checkedIcon}
        //         style={{ marginRight: 8 }}
        //         checked={isChecked(option)}
        //       />
        //       {"option.filter_display_text"}
        //     </React.Fragment>
        //   );
        // }}
        // renderInput={(params) => (
        //   <TextField
        //     {...params}
        //     variant="outlined"
        //     label={"props.title"}
        //     placeholder="Favorites"
        //   />
        // )}
      />
    </div>
  );
};
