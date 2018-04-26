import React from "react";
import { PropTypes } from "prop-types";
import NextIcon from "assets/next_icon.svg";
import BackIcon from "assets/back_white_icon.svg";
import Image from "components/Image";
import "./styles.css";

const Button = props => {
  let btnNext = null;
  let btnBack = null;
  if (props.next) {
    btnNext = (
      <span className="button--next">
        <Image src={NextIcon} />
      </span>
    );
  } else if (props.back) {
    btnBack = (
      <span className="button--back">
        <Image src={BackIcon} alt="back_icon" />
      </span>
    );
  }
  return (
    <button onClick={props.onClick} className="button">
      {btnBack}
      <span className="button__text">{props.children}</span>
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
