// TODO TURN ON FLOW

import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { UploadButton, Button } from "components/Button";
import Image from "components/Image";
import "./styles.css";


// Export this for unit testing more easily
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
  onHandleUserName = event => {
    this.props.onHandleUserName(event);
  };

  onNextButtonClick(nextScreen) {
    this.props.handleNextButtonClick(nextScreen);
  }
  handleUploadFile = uploadedFile => {
    this.props.handleUploadFile(uploadedFile, "image");
  };
  handleRemoveUploadedImage(imagePath) {
    this.props.handleRemoveUploadedImage(imagePath);
  }

  render() {
    const {
      sharedData: { userName, isSuccessfullUploaded, inputValue },
      imageData: { imagePath }
    } = this.props;
    return (
      <div className="uploadPhotoContainer">
        <div className="uploadPhotoTitle">Upload reference face photo</div>
        <p className="textInfo">
          Tell us who’s photos would you like to find in fotoreport
        </p>
        <div className="nameInputContainer">
          <span className="numberInfo"> 1 </span>
          <input
            id="name"
            className="nameInput"
            value={userName}
            onChange={event => this.onHandleUserName(event)}
            type="text"
            placeholder="Specify person's name"
          />
        </div>
        <div className="infoContainer">
          <span className="numberInfo"> 2 </span>
          <p className="textInfo">
            Please select a photo with the single face on it. Avoid photos where
            face is covered with scarf or sunglasses.
          </p>
        </div>
        <div className="photoContainer">
          {isSuccessfullUploaded && (
            <Image
              src={imagePath}
              handleRemoveUploadedFile={() =>
                this.handleRemoveUploadedImage(imagePath)
              }
            />
          )}
        </div>
        <div className="bottomContainer">
          {isSuccessfullUploaded === false ? (
            <UploadButton
              inputValue={inputValue}
              onChange={this.handleUploadFile}
              accept=".jpg,.png"
            >
              Browser
            </UploadButton>
          ) : (
            <Button onClick={() => this.onNextButtonClick("second")} next>
              Next
            </Button>
          )}
        </div>
      </div>
    );
  }
}
