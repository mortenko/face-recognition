// TODO implement FLOW
import React, { Component, Fragment } from "react";
import downloadIcon from "assets/download_icon.svg";
import shareIcon from "assets/share_icon.svg";
import Image from "components/Image";
import pathParse from "path-parse";
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
      <div className="gallery">
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
              <span className="gallery__head__userName">
                {" "}
                {userName}{" "}
              </span>{" "}
              in &nbsp;&nbsp;
              <span className="gallery__head__originalFileName">
                {originalFileName}{" "}
              </span>
            </div>
          </div>
          <div className="gallery__content">
            {photos.length === 0 ? (
              <h1 className="spinner">LOADING MATCHED PHOTOS...</h1>
            ) : (
              photos.map(srcPath => {
                const relativePath = srcPath.split("public/").pop();
                const parseImgPath = pathParse(relativePath);
                return (
                  <div
                    className="gallery__photo"
                    onClick={() => this.handleClickedPhoto(relativePath)}
                  >
                    <Image
                      key={parseImgPath.name}
                      src={relativePath}
                      height={262}
                      width={183}
                      handleRemoveUploadedFile={this.handleRemoveUploadedFile}
                      remove
                    />
                    <span className="gallery__photo__name">{parseImgPath.base}</span>
                  </div>
                );
              })
            )}
          </div>
        </Fragment>
      </div>
    );
  }
}
