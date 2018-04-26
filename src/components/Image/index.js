import React from "react";
import { PropTypes } from "prop-types";
import cancelIcon from "assets/cancel_icon.svg";
import "./styles.css";

const Image = props => {
  const { removeFile, src, remove, ...rest } = props;
  return (
    <div className="image__container">
      {remove && (
        <div className="image__cancel__icon" onClick={removeFile}>
          <img src={cancelIcon} alt="cancel_icon" />
        </div>
      )}
      <img className="image__photo" src={src} alt={src} {...rest} />
    </div>
  );
};

Image.defautProps = {
  remove: false,
  removeFile: () => {}
};
Image.propTypes = {
  removeFile: PropTypes.func,
  remove: PropTypes.bool,
  src: PropTypes.string.isRequired
};

export default Image;
