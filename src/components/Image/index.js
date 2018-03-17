import React from "react";
import { PropTypes } from "prop-types";
import CancelIcon from "../../assets/cancel_icon.png";
import "./styles.css";

const Image = props => (
  <div className="uploadedPhoto">
    <div onClick={props.handleRemoveUploadedFile} className="styledImageCancelIcon">
      <img src={CancelIcon} alt="cancel_icon" />
    </div>
    <img className="uploadedPhoto" src={props.src} />
  </div>
);
Image.propTypes = {
  handleRemoveUploadedFile: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired
};

export default Image;
