import React from "react";
import Router from "./router/router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useLocation } from "react-router-dom";
import useQuery from "./hooks/useQuery";
// import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div style={{ height: "100%" }}>
      {/* <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      > */}
      <Provider store={store}>
        <Router />
      </Provider>
      {/* </SnackbarProvider> */}
    </div>
  );
}

export default App;
