// TODO implement FLOW
import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import { PropTypes } from "prop-types";
import downloadIcon from "assets/download_icon.svg";
import shareIcon from "assets/share_icon.svg";
import Image from "components/Image";
import Spinner from "components/Spinner";
import pathParse from "path-parse";
import MarkedPhotoDetail from "components/MarkedPhotoDetail";
import GallerySpinner from "assets/gif/gallery_search.gif";
import "./styles.css";

@inject(stores => ({
  domainStore: stores.rootStore.domainStore,
  sharedStore: stores.rootStore.sharedStore
}))
@observer
export default class ImageGallery extends Component {
  static propTypes  = {
    domainStore: PropTypes.shape({
      photos: PropTypes.array,
      matchedPath: PropTypes.string,
      photoName: PropTypes.string,
      handleClickedPhoto: PropTypes.func,
      goBackToGallery: PropTypes.func,
      removePhotoFromGallery: PropTypes.func
    }).isRequired,
    sharedStore: PropTypes.shape({
      userName: PropTypes.string,
      originalFileName: PropTypes.string
    })
  };
  static defaultProps = {
    sharedStore: PropTypes.shape({
      userName: "",
      originalFileName: ""
    })
  };

  render() {
    const { userName, originalFileName } = this.props.sharedStore;
    const {
      photos,
      matchedPath,
      photoName,
      handleClickedPhoto,
      goBackToGallery,
      removePhotoFromGallery,
      getActualState
    } = this.props.domainStore;
    return (
      <div className="gallery">
        {matchedPath !== "" ? (
          <MarkedPhotoDetail
            photoName={photoName}
            userName={userName}
            goBackToGallery={goBackToGallery}
            matchedPath={matchedPath}
          />
        ) : (
          <Fragment>
            <div className="gallery__head">
              <div className="icon__group">
                <div className="icon__group__circle">
                  <Image src={shareIcon} width={15} height={16} />
                </div>
                <div className="icon__group__circle">
                  <Image src={downloadIcon} width={15} height={16} />
                </div>
              </div>
              <div className="gallery__head__text">
                We found these photos of
                <span className="gallery__head__userName"> {userName} </span> in
                &nbsp;&nbsp;
                <span className="gallery__head__originalFileName">
                  {originalFileName}
                </span>
              </div>
            </div>
            <div className="gallery__content">
              {getActualState === "pending" ? (
                <Spinner src={GallerySpinner} />
              ) : (
                photos.map(srcPath => {
                  const relativePath = srcPath.split("public/").pop();
                  const parseImgPath = pathParse(relativePath);
                  return (
                    <div
                      className="gallery__photo"
                      onClick={() =>
                        handleClickedPhoto(relativePath, parseImgPath.base)
                      }
                    >
                      <Image
                        key={parseImgPath.name}
                        src={relativePath}
                        height={262}
                        width={200}
                        removeFile={() => removePhotoFromGallery(srcPath)}
                        remove
                      />
                      <span className="gallery__photo__name">
                        {parseImgPath.base}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}
