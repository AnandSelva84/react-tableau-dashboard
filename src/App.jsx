import React from "react";
import Router from "./router/router";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  React.useEffect(() => {
    store.dispatch({ type: "test" });
  }, []);

  return (
    <div>
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
}

export default App;
