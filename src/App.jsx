import React from "react";
import Router from "./router/router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useLocation } from "react-router-dom";
import useQuery from "./hooks/useQuery";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
}

export default App;
