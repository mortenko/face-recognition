import React from "react";
import { PropTypes } from "prop-types";
import NextIcon from "assets/next_icon.png";
import BackIcon from "assets/back_icon.png";
import "./styles.css";

const Button = props => {
  let btnNext = null;
  let btnBack = null;
  if (props.next) {
    btnNext = (
      <span className="styledNextIcon">
        <img src={NextIcon} alt="next_icon" />
      </span>
    );
  } else if (props.back) {
    btnBack = (
      <span className="styledBackIcon">
        <img src={BackIcon} alt="back_icon" />
      </span>
    );
  }
  return (
    <button onClick={props.onClick} className="button">
      {btnBack}
      <span className="buttonText">{props.children}</span>
      {btnNext}
    </button>
  );
};

Button.propTypes = {
  next: PropTypes.bool,
  back: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
};

Button.defaultProps = {
  next: false,
  back: false,
  onClick: () => {}
};

export default Button;
