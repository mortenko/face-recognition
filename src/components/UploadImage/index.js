// TODO TURN ON FLOW

import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { observer, inject } from "mobx-react";
import { UploadButton, Button } from "components/Button";
import Image from "components/Image";
import "./styles.css";

@inject(stores => ({
  sharedStore: stores.rootStore.sharedStore
}))
@observer
export default class UploadImage extends Component {
  static propTypes = {
    sharedStore: PropTypes.shape({
      isSuccessfullUploaded: PropTypes.bool,
      userName: PropTypes.string,
      inputValue: PropTypes.string,
      imagePath: PropTypes.string,
      goToNextScreen: PropTypes.func.isRequired,
      handleUploadFile: PropTypes.func.isRequired,
      onHandleUserName: PropTypes.func.isRequired,
      removeUploadedFile: PropTypes.func.isRequired
    })
  };
  static defaultProps = {
    sharedStore: PropTypes.shape({
      isSuccessfullUploaded: false,
      userName: "",
      inputValue: "",
      imagePath: ""
    })
  };

  render() {
    const {
      userName,
      isSuccessfullUploaded,
      inputValue,
      onHandleUserName,
      handleUploadFile,
      goToNextScreen,
      removeUploadedFile,
      imagePath
    } = this.props.sharedStore;
    return (
      <div className="upload__photo">
        <div className="upload__photo__title">Upload reference face photo</div>
        <p className="upload__photo__text">
          Tell us who’s photos would you like to find in fotoreport
        </p>
        <div className="upload__photo__input">
          <span className="upload__photo__number"> 1 </span>
          <input
            id="name"
            className="upload__input__name"
            value={userName}
            onChange={event => onHandleUserName(event)}
            type="text"
            placeholder="Specify person's name"
          />
        </div>
        <div className="upload__photo__info">
          <span className="upload__photo__number"> 2 </span>
          <p className="upload__photo__text">
            Please select a photo with the single face on it. Avoid photos where
            face is covered with scarf or sunglasses.
          </p>
        </div>
        <div className="upload__photo__content">
          {isSuccessfullUploaded && (
            <Image
              src={imagePath}
              removeFile={() => removeUploadedFile("image")}
              remove
            />
          )}
        </div>
        <div className="upload__photo__bottom__container">
          {isSuccessfullUploaded === false ? (
            <UploadButton
              inputValue={inputValue}
              onChange={uploadedFile => handleUploadFile(uploadedFile, "image")}
              accept=".jpg,.png"
            >
              Browser
            </UploadButton>
          ) : (
            <Button onClick={() => goToNextScreen("second")} next>
              Next
            </Button>
          )}
        </div>
      </div>
    );
  }
}
