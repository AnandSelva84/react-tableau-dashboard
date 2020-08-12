import React from "react";
import Router from "./router/router";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
}

export default App;
