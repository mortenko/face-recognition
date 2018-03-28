// TODO TURN ON FLOW

import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { action } from "mobx";
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
    sharedData: PropTypes.shape({
      isSuccessfullUploaded: PropTypes.bool,
      userName: PropTypes.string,
      inputValue: PropTypes.string
    }).isRequired,
    imageData: PropTypes.objectOf(PropTypes.string).isRequired,
    handleNextButtonClick: PropTypes.func.isRequired,
    handleUploadFile: PropTypes.func.isRequired,
    onHandleUserName: PropTypes.func.isRequired,
    handleRemoveUploadedImage: PropTypes.func.isRequired
  };
  // onHandleUserName = event => {
  //   this.props.onHandleUserName(event);
  // };

  // onNextButtonClick(nextScreen) {
  //   this.props.handleNextButtonClick(nextScreen);
  // }
  // handleUploadFile = uploadedFile => {
  //   this.props.handleUploadFile(uploadedFile, "image");
  // };
  handleRemoveUploadedImage(imagePath) {
    this.props.handleRemoveUploadedImage(imagePath);
  }

  render() {
    console.log(this.props);
    const {
      userName,
      isSuccessfullUploaded,
      inputValue,
      onHandleUserName,
      handleUploadFile,
      imageData: { imagePath },
      handleNextButtonClick
    } = this.props.sharedStore;
    // const { userName, isSuccessfullUploaded, inputValue } = this.props;
    // const { imageData: { imagePath } } = this.props;
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
              width={284}
              height={215}
              remove
              src={imagePath}
              handleRemoveUploadedFile={() =>
                this.handleRemoveUploadedImage(imagePath)
              }
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
            <Button onClick={() => handleNextButtonClick("second")} next>
              Next
            </Button>
          )}
        </div>
      </div>
    );
  }
}
