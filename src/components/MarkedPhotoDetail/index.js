import React from "react";
import { Button } from "components/Button";
import { PropTypes } from "prop-types";
import Image from "components/Image";
import shareIcon from "assets/share_icon.svg";
import downloadIcon from "assets/download_icon.svg";
import "./styles.css";

const MarkedPhotoDetail = ({ matchedPath, userName, photoName, goBackToGallery }) => (
  <div className="photo">
    <div className="photo__header">
      <Button onClick={goBackToGallery}> Back </Button>
      <div className="photo__icon__group">
        <div className="photo__icon__circle">
          <Image src={shareIcon} width={15} height={16} alt="share_icon" />
        </div>
        <div className="photo__icon__circle">
          <Image
            src={downloadIcon}
            width={15}
            height={16}
            alt="download_icon"
          />
        </div>
      </div>
    </div>
    <div className="photo__marked">
      <Image src={matchedPath} width={300} height={300} alt="detail_photo" />
      <span>
        {userName} in {photoName}
      </span>
    </div>
  </div>
);

MarkedPhotoDetail.propTypes  = {
  matchedPath: PropTypes.string.isRequired,
  goBackToGallery: PropTypes.func.isRequired,
  photoName: PropTypes.string,
  userName: PropTypes.string
};
MarkedPhotoDetail.defaultProps = {
  photoName: "",
  userName: ""
};

export default MarkedPhotoDetail;
