import React from "react";
import { PropTypes } from "prop-types";
import plusIcon from "../../assets/plus_icon.png";
import "./styles.css";

const UploadButton = props => (
  <label htmlFor="file" className="buttonUpload">
    <span className="styledPlusIcon">
      <img src={plusIcon} width={17} height={15} alt="plus_icon" />
    </span>
    <input
      id="file"
      type="file"
      value={props.inputValue}
      name="uploadFile"
      accept={props.accept}
      onChange={props.onChange}
    />
    <span className="buttonText">{props.children}</span>
  </label>
);
UploadButton.propTypes = {
  accept: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default UploadButton;


