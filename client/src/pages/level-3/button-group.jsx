import React from "react";
import { IconButton, ButtonGroup } from "@material-ui/core";
import { BarChart, SwapVert, TableChart } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import useData from "../../hooks/useStore";
import { setShowControl } from "../../redux/actions/shared";

const ShowGroup = () => {
  const dispatch = useDispatch();
  const { showValue } = useData().sharedReducer;

  const showTable = showValue === "table";
  const showGraph = showValue === "graph";
  const showBoth = showValue === "both";

  const setValue = (value) => {
    dispatch(setShowControl(value));
  };
  return (
    <>
      <ButtonGroup>
        <IconButton
          onClick={() => setValue("graph")}
          style={{ backgroundColor: showGraph ? "#f4f4f4" : "" }}
        >
          <BarChart />
        </IconButton>
        <IconButton
          style={{ backgroundColor: showBoth ? "#f4f4f4" : "" }}
          onClick={() => setValue("both")}
        >
          <SwapVert />
        </IconButton>
        <IconButton
          style={{ backgroundColor: showTable ? "#f4f4f4" : "" }}
          onClick={() => setValue("table")}
        >
          <TableChart />
        </IconButton>
      </ButtonGroup>
    </>
  );
};

export default ShowGroup;
