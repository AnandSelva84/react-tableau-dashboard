import React from "react";
import PanelSwitch from "../../panel-switch";
import OutlinedTextFeild from "../../../../../components/TextFeild";
import SimpleSelect from "./../../../../../components/simple-select/simple-select";
import { PropTypes } from "prop-types";

export default function Feilds(props) {
  const { field_type, field_label, onSwitchChange } = props;
  const handleSwitchChange = (e) => {
    const { checked } = e.target;
    onSwitchChange(checked);
  };

  const handleNumericValueChange = (value) => {
    props.onNumericChange(value);
  };

  return (
    <div>
      {field_type === "Switch" && <PanelSwitch onChange={handleSwitchChange} />}
      {field_type === "Dropdown" && false && (
        <SimpleSelect
          size="small"
          style={{ paddingTop: "0rem" }}
          readWrite
          handleChange={() => {}}
          options={[]}
          label={field_label}
        />
      )}
      {field_type === "Numeric" && (
        <OutlinedTextFeild
          size="small"
          style={{ height: "10" }}
          label="Only incl. duration >= (in days)"
          onChange={handleNumericValueChange}
        />
      )}
    </div>
  );
}

Feilds.propTypes = {
  field_type: PropTypes.any,
  field_label: PropTypes.string,
  onSwitchChange: PropTypes.func,
  onNumericChange: PropTypes.func,
};
