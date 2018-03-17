import React from "react";
import { PropTypes } from "prop-types";
import "./styles.css";

const DotIndicator = props => (
  <div className="dot-indicator-container">
    <div className={props.isActiveScreen === "first" ? "dot-indicator-on" : "dot-indicator-off"} />
    <div className={props.isActiveScreen === "second" ? "dot-indicator-on" : "dot-indicator-off"} />
    <div className={props.isActiveScreen === "third" ? "dot-indicator-on" : "dot-indicator-off"} />
  </div>
);

DotIndicator.propTypes = {
  isActiveScreen: PropTypes.string.isRequired
};

export default DotIndicator;
