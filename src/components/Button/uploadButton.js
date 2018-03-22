import React from "react";
import { PropTypes } from "prop-types";
import plusIcon from "assets/plus_icon.svg";
import Image from "components/Image";
import "./styles.css";

const UploadButton = props => (
  <label htmlFor="file" className="button__upload">
    <div className="button__plus">
      <Image src={plusIcon} width={17} height={15} />
    </div>
    <input
      id="file"
      type="file"
      value={props.inputValue}
      name="uploadFile"
      accept={props.accept}
      onChange={props.onChange}
    />
    <span className="button__text">{props.children}</span>
  </label>
);
UploadButton.propTypes = {
  accept: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default UploadButton;
