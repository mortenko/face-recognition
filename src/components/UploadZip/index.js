// TODO TURN ON FLOW

import React, { Component } from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";
import { Button, UploadButton } from "components/Button";
import Image from "components/Image";
import cancelIcon from "assets/cancel_icon.svg";
import fileLogo from "assets/file_logo_icon.svg";
import "./styles.css";

// Export this for unit testing more easily
export default class UploadZip extends Component {
  static propTypes = {
    sharedData: PropTypes.shape({
      isSuccessfullUploaded: PropTypes.bool,
      userName: PropTypes.string,
      inputValue: PropTypes.string
    }).isRequired,
    zipData: PropTypes.objectOf(PropTypes.string).isRequired,
    handleNextButtonClick: PropTypes.func.isRequired,
    handleUploadFile: PropTypes.func.isRequired,
    handleRemoveUploadedImage: PropTypes.func.isRequired
  };

  onNextButtonClick = nextScreen => {
    this.props.handleNextButtonClick(nextScreen);
  };
  handleUploadFile = uploadedZip => {
    this.props.handleUploadFile(uploadedZip, "zipFile");
  };

  handleRemoveUploadedZip(archivePath) {
    this.props.handleRemoveUploadedImage(archivePath);
  }

  render() {
    const {
      sharedData: { isSuccessfullUploaded, inputValue, userName },
      zipData: { originalFileName, archivePath }
    } = this.props;
    return (
      <div className="upload__zip">
        <h3 className="upload__zip__title">Upload photo library</h3>
        <p className="upload__zip__text">
          Upload .zip file containing bunch of photos in which you wish to find
        </p>
        <br />
        <span className="upload__zip__user__name">{userName}</span>
        <br />
        <hr />
        <div
          className={classnames(
            "upload__zip__file",
            isSuccessfullUploaded
              ? "upload__zip__file--visible"
              : "upload__zip__file--hidden"
          )}
        >
          <div
            onClick={() => this.handleRemoveUploadedZip(archivePath)}
            className="cancel__icon"
          >
            <Image src={cancelIcon} />
          </div>
          <Image className="file__logo" src={fileLogo} />
          <span className="file__name">{originalFileName}</span>
        </div>
        <div className="upload__zip__bottom__container">
          {isSuccessfullUploaded === false ? (
            <UploadButton
              accept=".zip"
              inputValue={inputValue}
              onChange={this.handleUploadFile}
            >
              Browser
            </UploadButton>
          ) : (
            <Button onClick={() => this.onNextButtonClick("third")} next>
              Next
            </Button>
          )}
        </div>
      </div>
    );
  }
}
