import React from "react";
import { CardActionArea, Checkbox } from "@material-ui/core";
import select from "../../theme/select";
import { PropTypes } from "prop-types";

const Option = (props) => {
  const { checked } = props;

  React.useEffect(() => {
    props.onChange(checked, props.id, props.parentId);

    // continuesFilter(filterState, onFilterEnd);
  }, [checked]);

  return (
    <>
      <CardActionArea
        ref={props.ref}
        style={{ ...select.option }}
        onClick={() => {
          props.onClick();
        }}
      >
        <Checkbox
          checked={!!props.checked}
          // onChange={props.onChange()}
          color="primary"
        />
        <div>{props.display}</div>
      </CardActionArea>
    </>
  );
};

Option.propTypes = {
  checked: PropTypes.any,
  onChange: PropTypes.func,
  display: PropTypes.string,
  onClick: PropTypes.func,
  ref: PropTypes.any,
  parentId: PropTypes.any,
  id: PropTypes.any,
};

export default Option;
