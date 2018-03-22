import React from "react";
import { PropTypes } from "prop-types";
import "./styles.css";

const DotIndicator = props => (
  <div className="dotIndicator">
    <div className={props.isActiveScreen === "first" ? "dot__indicator--on" : "dot__indicator--off"} />
    <div className={props.isActiveScreen === "second" ? "dot__indicator--on" : "dot__indicator--off"} />
    <div className={props.isActiveScreen === "third" ? "dot__indicator--on" : "dot__indicator--off"} />
  </div>
);

DotIndicator.propTypes = {
  isActiveScreen: PropTypes.string.isRequired
};

export default DotIndicator;
