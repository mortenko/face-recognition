import React, { Fragment } from "react";
import DevTools from "mobx-react-devtools";
import Root from "containers/Root";
import Header from "components/Header";
import "./App.css";

const App = () => (
  <Fragment>
    <Header />
    <DevTools />
    <Root />
  </Fragment>
);

export default App;
