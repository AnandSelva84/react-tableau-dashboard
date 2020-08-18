import React from "react";
import clsx from "clsx";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import { useDispatch } from "react-redux";
import useData from "../../hooks/useStore";
import { toggleDrawer } from "../../redux/actions/shared";
import LocalTheme from "../../theme/layout";
import PrevGlobalFilters from "../../components/global-filter/previous-global-filter";
import { PropTypes } from "prop-types";

const drawerWidth = "17rem";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      // transition: theme.transitions.create("width", {
      //   easing: theme.transitions.easing.easeOut,
      //   duration: theme.transitions.duration.enteringScreen,
      // }),
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      // padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      // justifyContent: "space-between",
    },
    content: {
      flexGrow: 1,
      // padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

const SwipSideDrawer = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { darkMode, drawer, showReport } = useData().sharedReducer;
  const [open] = React.useState(true);
  const { darkHeader: darkTheme } = LocalTheme;
  const dark = !darkMode ? null : darkTheme;

  // const store = useData().sharedReducer;

  const handleDrawerClose = () => {
    dispatch(toggleDrawer());
  };

  const getWidth = () => {
    if (!drawer) return 0;
    if (showReport) return "39.8rem";
    else return "19.9rem";
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={(classes.drawer, { width: getWidth() })}
        style={{ width: getWidth() }}
        anchor="left"
        open={drawer}
        onClose={handleDrawerClose}
      >
        <div
          className={classes.drawerHeader}
          style={{ ...dark, width: getWidth() }}
        >
          <div
            style={{
              fontSize: "1.3rem",
              padding: "0 0.5rem",
              ...dark,
              flex: 1,
            }}
          >
            Filters
          </div>

          {showReport && (
            <div
              style={{
                fontSize: "1.3rem",
                padding: "0 0.5rem",
                ...dark,
                flex: 1,
              }}
            >
              Report Filters
            </div>
          )}
        </div>
        <Divider />
        <div className="global-filters">
          <PrevGlobalFilters />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {props.children}
      </main>
    </div>
  );
};

SwipSideDrawer.propTypes = {
  children: PropTypes.any,
};
export default SwipSideDrawer;
