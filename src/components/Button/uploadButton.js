import React from "react";
import { PropTypes } from "prop-types";
import plusIcon from "assets/plus_icon.svg";
import Image from "components/Image";
import "./styles.css";

const UploadButton = ({ inputValue, accept, onChange, children }) => (
  <label htmlFor="file" className="button__upload">
    <div className="button--plus">
      <Image src={plusIcon} width={17} height={15} />
    </div>
    <input
      id="file"
      type="file"
      value={inputValue}
      name="uploadFile"
      accept={accept}
      onChange={onChange}
    />
    <span className="button__text">{children}</span>
  </label>
);
UploadButton.propTypes = {
  accept: PropTypes.string,
  inputValue: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node
}.isRequired;

export default UploadButton;
