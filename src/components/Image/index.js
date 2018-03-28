import React from "react";
import { PropTypes } from "prop-types";
import cancelIcon from "assets/cancel_icon.svg";
import "./styles.css";

const Image = props => {
  const { handleRemoveUploadedFile, src, remove, height, width } = props;
  return (
    <div className="image">
      {remove && (
        <div className="image__cancel__icon" onClick={handleRemoveUploadedFile}>
          <img src={cancelIcon} alt="cancel_icon" />
        </div>
      )}
      <img
        height={height}
        width={width}
        src={src}
        alt={src}
      />
    </div>
  );
};

Image.propTypes = {
  height: PropTypes.number,
  handleRemoveUploadedFile: PropTypes.func.isRequired,
  remove: PropTypes.bool,
  src: PropTypes.string.isRequired,
  width: PropTypes.number
};

Image.defautProps = {
  remove: false
};

export default Image;
