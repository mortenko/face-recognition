import React, { Fragment } from "react";
import Home from "./containers/Home";
import Header from "./components/Header";
import "./App.css";

const App = () => (
  <Fragment>
    <Header />
    <Home />
  </Fragment>
);

export default App;
