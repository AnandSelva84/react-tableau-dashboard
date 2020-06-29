import React from "react";
import TableauReport from "tableau-react";
import { Button } from "@material-ui/core";

const Report = (props) => {
  const [filters, setFilters] = React.useState({});
  const [show, setShow] = React.useState(false);
  const options = {
    height: "70vh",
    width: "50rem",
    hideTabs: false,
    hideToolbar: true,

    // All other vizCreate options are supported here, too
    // They are listed here: https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#ref_head_9
  };
  React.useEffect(() => {
    if (!!!show)
      setTimeout(() => {
        setShow(true);
      }, 100);
  }, [show]);

  const handleClick = () => {
    setFilters({
      Region: "Europe",
    });
  };

  const resetFilters = () => {
    setFilters({
      Region: ["Asia", "Europe"],
    });
  };

  const getProps = () => {
    if (filters.Region) {
      return filters;
    }
  };
  React.useEffect(() => {
    console.log("report filters", filters);
    setShow(false);
  }, [filters]);

  return (
    <>
      <div style={{ display: "flex" }} className="">
        <Button onClick={handleClick}>Change Filters</Button>
        <Button onClick={resetFilters}>Reset Filters</Button>
      </div>
      {show && (
        <TableauReport
          filters={filters}
          url="https://public.tableau.com/views/WorldIndicators/GDPpercapita"
          options={options}
          // query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
        />
      )}
    </>
  );
};

export default Report;
