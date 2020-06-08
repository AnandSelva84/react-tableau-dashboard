import React from "react";
import { TextField } from "@material-ui/core";

const DatePickers = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem 0.5rem",
        }}
      >
        <TextField
          id="date"
          label="From"
          type="date"
          defaultValue="2017-05-24"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="date"
          label="To"
          type="date"
          defaultValue="2017-05-24"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      {/* <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="To"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider> */}
    </>
  );
};

export default DatePickers;
