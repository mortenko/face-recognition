import React from "react";
import { PropTypes } from "prop-types";
import cancelIcon from "assets/cancel_icon.svg";
import "./styles.css";

const Image = props => {
  const { handleRemoveUploadedFile, src, remove, ...rest } = props;
  return (
    <div className="image">
      {remove && (
        <div className="image__cancel__icon" onClick={handleRemoveUploadedFile}>
          <img src={cancelIcon} alt="cancel_icon" />
        </div>
      )}
      <img src={src} alt={src} {...rest} />
    </div>
  );
};

Image.propTypes = {
  handleRemoveUploadedFile: PropTypes.func,
  remove: PropTypes.bool,
  src: PropTypes.string.isRequired
};

Image.defautProps = {
  remove: false,
  handleRemoveUploadedFile: () => {}
};

export default Image;
