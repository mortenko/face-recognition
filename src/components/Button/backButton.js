import React from "react";
import arrowBack from "assets/back_icon.svg";
import { PropTypes } from "prop-types";
import Image from "../Image";

const BackButton = ({ handleBackButtonClick }) => (
  <div className="button--back" onClick={handleBackButtonClick}>
    <Image src={arrowBack} />
  </div>
);

BackButton.propTypes = {
  handleBackButtonClick: PropTypes.func.isRequired
};

export default BackButton;
