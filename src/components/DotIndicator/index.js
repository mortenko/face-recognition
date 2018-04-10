import React from "react";
import { PropTypes } from "prop-types";
import "./styles.css";

const DotIndicator = ({ activeScreen }) => (
  <div className="dotIndicator">
    <div
      className={
        activeScreen === "first" ? "dot__indicator--on" : "dot__indicator--off"
      }
    />
    <div
      className={
        activeScreen === "second" ? "dot__indicator--on" : "dot__indicator--off"
      }
    />
    <div
      className={
        activeScreen === "third" ? "dot__indicator--on" : "dot__indicator--off"
      }
    />
  </div>
);

DotIndicator.propTypes = {
  activeScreen: PropTypes.string.isRequired
};

export default DotIndicator;
