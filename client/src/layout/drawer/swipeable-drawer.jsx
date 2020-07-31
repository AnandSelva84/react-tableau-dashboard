import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useDispatch } from "react-redux";
import useData from "../../hooks/useStore";
import { toggleDrawer } from "../../redux/actions/shared";
import Select from "../../components/select/select";
import GlobalFilters from "../../components/global-filter/global-filter";
import LocalTheme from "../../theme/layout";
import PrevGlobalFilters from "../../components/global-filter/previous-global-filter";
import { useHistory } from "react-router-dom";

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
  const {
    darkMode,
    appIsLoading,
    app: appData,
    drawer,
    showReport,
  } = useData().sharedReducer;
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { header, darkHeader: darkTheme } = LocalTheme;
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.substr(1, pathname.length);
  const dark = !darkMode ? null : darkTheme;

  // const store = useData().sharedReducer;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    dispatch(toggleDrawer());
  };

  const howManySlashes = (text) => {
    var letterArray = text.split("");
    let counter = 0;
    letterArray.forEach((letter) => {
      if (letter === "/") {
        counter += 1;
      }
    });
    return counter;
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
export default SwipSideDrawer;
