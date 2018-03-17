// TODO implement FLOW
import React, { Component, Fragment } from "react";
import downloadIcon from "assets/download_icon.png";
import shareIcon from "assets/share_icon.png";
import Image from "components/Image";
import PhotoDetail from "components/PhotoDetail";
import "./styles.css";

export default class ImageGallery extends Component {
  handleRemoveUploadedFile() {
    console.log("remove file");
  }
  handleClickedPhoto(path) {
    this.props.getMatchedPhotoPath(path);
  }
  goBack = () => {
    console.log("imageGallery");
    this.props.goBack();
  };
  render() {
    const {
      matchedPathFiles: { photos, matchedPath },
      sharedData: { userName },
      zipData: { originalFileName }
    } = this.props;
    return (
      <div className="gallery-container">
        {matchedPath !== "" ? (
          <PhotoDetail goBack={this.goBack} matchedPath={matchedPath} />
        ) : (
          <Fragment>
            <div className="gallery-head">
              <div className="gallery-icon-group">
                <div className="gallery-icon-circle">
                  <img
                    src={shareIcon}
                    width={15}
                    height={16}
                    alt="share_icon"
                  />
                </div>
                <div className="gallery-icon-circle">
                  <img
                    src={downloadIcon}
                    width={15}
                    height={16}
                    alt="download_icon"
                  />
                </div>
              </div>
              <div className="gallery-container-text">
                We found these photos of
                <span className="username-text"> {userName} </span> in
                &nbsp;&nbsp;
                <span className="originalfilename-text">
                  {originalFileName}{" "}
                </span>
              </div>
            </div>
            <div className="gallery-content">
              {photos.length === 0 ? (
                <h1 className="spinner">LOADING MATCHED PHOTOS...</h1>
              ) : (
                photos.map(srcPath => {
                  const relativePath = srcPath.split("public/").pop();
                  return (
                    <div
                      className="gallery-photo"
                      onClick={() => this.handleClickedPhoto(relativePath)}
                    >
                      <Image
                        key={relativePath}
                        src={relativePath}
                        handleRemoveUploadedFile={this.handleRemoveUploadedFile}
                      />
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
