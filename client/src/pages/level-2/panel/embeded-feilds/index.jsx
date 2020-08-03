import React from "react";
import Feilds from "./feild";

export default function EmbededFeilds(props) {
  const { onSwitchChange, onNumericChange } = props;
  return (
    <>
      {props.feilds.map((feild) => (
        <div style={{ position: "absolute", ...{ ...feild.field_location } }}>
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
