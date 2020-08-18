import React from "react";
import Feilds from "./feild";
import { PropTypes } from "prop-types";

export default function EmbededFeilds(props) {
  const { onSwitchChange, onNumericChange } = props;
  return (
    <>
      {props.feilds.map((feild) => (
        <div
          style={{ position: "absolute", ...{ ...feild.field_location } }}
          key={feild.field_label}
        >
          <Feilds
            onSwitchChange={onSwitchChange}
            {...feild}
            onNumericChange={onNumericChange}
          />
        </div>
      ))}
    </>
  );
}

EmbededFeilds.propTypes = {
  feilds: PropTypes.any,
  onSwitchChange: PropTypes.func,
  onNumericChange: PropTypes.func,
};
