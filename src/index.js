import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import "normalize.css";
import RootStore from "./mobx-store";
import App from "./App";
import "./styles/fonts/index.css";
import "./styles.css";
import registerServiceWorker from "./registerServiceWorker";




ReactDOM.render(
  <Router>
    <Provider rootStore={RootStore}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
