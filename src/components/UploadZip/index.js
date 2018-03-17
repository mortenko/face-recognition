// TODO TURN ON FLOW

import React, { Component } from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";
import fileLogo from "assets/fileLogo.png";
import { Button, UploadButton } from "components/Button";
import CancelIcon from "assets/cancel_icon.png";
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

  onNextButtonClick = (nextScreen) => {
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
      <div className="uploadZipContainer">
        <h3 className="uploadZipTitle">Upload photo library</h3>
        <p className="textInfo">
          Upload .zip file containing bunch of photos in which you wish to find
        </p>
        <br />
        <span className="searchUserName">{userName}</span>
        <br />
        <hr />
        <div
          className={classnames(
            "fileZipImageContainer",
            isSuccessfullUploaded ? "visible" : "hidden"
          )}
        >
          <div
            onClick={() => this.handleRemoveUploadedZip(archivePath)}
            className="styledCancelIcon"
          >
            <img src={CancelIcon} alt="cancel_icon" />
          </div>
          <div>
            <img className="fileLogo" src={fileLogo} alt="file_logo" />
          </div>
          <span className="fileName">{originalFileName}</span>
        </div>
        <div className="bottomContainer">
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
