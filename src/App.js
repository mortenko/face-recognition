import React, { Fragment } from "react";
import DevTools from "mobx-react-devtools";
import Home from "containers/Home";
import Header from "components/Header";
import "./App.css";

const App = () => (
  <Fragment>
    <Header />
    <DevTools />
    <Home />
  </Fragment>
);

export default App;
