// TODO TURN ON FLOW

import React, { Component } from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";
import { observer, inject } from "mobx-react";
import { Button, UploadButton } from "components/Button";
import Image from "components/Image";
import cancelIcon from "assets/cancel_icon.svg";
import fileLogo from "assets/file_logo_icon.svg";
import "./styles.css";

// Export this for unit testing more easily
@inject(stores => ({
  sharedStore: stores.rootStore.sharedStore
}))
@observer
export default class UploadZip extends Component {
  static propTypes = {
    sharedStore: PropTypes.shape({
      isSuccessfullUploaded: PropTypes.bool,
      userName: PropTypes.string,
      inputValue: PropTypes.string,
      originalFileName: PropTypes.string,
      goToNextScreen: PropTypes.func.isRequired,
      handleUploadFile: PropTypes.func.isRequired,
      removeUploadedFile: PropTypes.func.isRequired
    })
  };
  static defaultProps = {
    sharedStore: PropTypes.shape({
      isSuccessfullUploaded: false,
      userName: "",
      inputValue: "",
      originalFileName: ""
    })
  };
  render() {
    const {
      userName,
      isSuccessfullUploaded,
      inputValue,
      handleUploadFile,
      goToNextScreen,
      removeUploadedFile,
      originalFileName
    } = this.props.sharedStore;
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
            onClick={() => removeUploadedFile("zip")}
            className="upload__zip__cancel__icon"
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
              onChange={uploadedFile => handleUploadFile(uploadedFile, "zip")}
            >
              Browser
            </UploadButton>
          ) : (
            <Button onClick={() => goToNextScreen("third")} next>
              Next
            </Button>
          )}
        </div>
      </div>
    );
  }
}
