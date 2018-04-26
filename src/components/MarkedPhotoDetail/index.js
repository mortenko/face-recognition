import React from "react";
import { Button } from "components/Button";
import { PropTypes } from "prop-types";
import { observer, inject } from "mobx-react";
import Image from "components/Image";
import shareIcon from "assets/share_icon.svg";
import downloadIcon from "assets/download_icon.svg";
import "./styles.css";

const MarkedPhotoDetail = inject(stores => ({
  userName: stores.rootStore.sharedStore.userName,
  domainStore: stores.rootStore.domainStore
}))(
  observer(
    ({
      domainStore: { matchedPath, photoName, goBackToGallery, getOriginalPath },
      userName
    }) => {
      return (
        <div className="photo">
          <div className="photo__header">
            <Button onClick={goBackToGallery} back>
              {" "}
              Back{" "}
            </Button>
            <div className="photo__icon__group">
              <div className="photo__icon__circle">
                <Image
                  src={shareIcon}
                  width={15}
                  height={16}
                  alt="share_icon"
                />
              </div>
              <a
                href={getOriginalPath}
                download
                className="photo__icon__circle"
              >
                <Image
                  src={downloadIcon}
                  width={15}
                  height={16}
                  alt="download_icon"
                />
              </a>
            </div>
          </div>
          <div className="photo__marked">
            <Image src={matchedPath} alt="detail_photo" />
            <span className="photo__text">
              {userName} in {photoName}
            </span>
          </div>
        </div>
      );
    }
  )
);

MarkedPhotoDetail.propTypes = {
  originalPath: PropTypes.string.isRequired,
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
