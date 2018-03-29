import React, { Component } from "react";
import axios from "axios";
import UploadImage from "components/UploadImage";
import { BackButton } from "components/Button";
import UploadZip from "components/UploadZip";
import ImageGallery from "components/ImageGallery";
import DotIndicator from "components/DotIndicator";
import pathParse from "path-parse";
import "./styles.css";

class Home extends Component {
  constructor() {
    super();
    this.handleUnZipFile = this.handleUnZipFile.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  state = {
    isActiveScreen: "first",
    sharedData: {
      userName: "",
      isSuccessfullUploaded: false,
      inputValue: "",
      rootUniqueDirName: ""
    },
    imageData: {
      imagePath: ""
    },
    zipData: {
      archivePath: "",
      originalFileName: ""
    },
    matchedPathFiles: {
      marked_photos: [],
      photos: [],
      matchedPath: "",
      photoName: ""
    }
  };
  async handleUnZipFile() {
    const {
      sharedData: { userName, rootUniqueDirName },
      imageData: { imagePath },
      zipData: { archivePath, originalFileName }
    } = this.state;
    const data = {
      userName,
      imagePath,
      archivePath,
      originalFileName,
      rootUniqueDirName
    };
    try {
      const response = await axios.post("/file/unzip", data);
      this.setState({
        matchedPathFiles: {
          ...this.state.matchedPathFiles,
          marked_photos: response.data.marked_photos,
          photos: response.data.photos
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async handleUploadFile(uploadedFile, fileType) {
    const { sharedData: { rootUniqueDirName } } = this.state;
    const file = uploadedFile.target.files[0];
    const formData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    formData.append("file", file);
    formData.append("rootUniqueDirName", rootUniqueDirName);
    try {
      const { data } = await axios.post("/file/upload", formData, config);
      const sharedData = {
        ...this.state.sharedData,
        isSuccessfullUploaded: true
      };

      if (fileType === "image") {
        this.setState({
          imageData: {
            imagePath: data.filePath
          },
          sharedData: {
            ...sharedData,
            rootUniqueDirName: data.rootUniqueDirName
          }
        });
      } else if (fileType === "zipFile") {
        this.setState({
          zipData: {
            archivePath: data.filePath,
            originalFileName: data.originalFileName
          },
          sharedData
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleClickedPhoto = (path, photoName) => {
    const { matchedPathFiles: { marked_photos } } = this.state;
    const notMarkedPhotoName = pathParse(path);
    marked_photos.forEach(markedPhotoPath => {
      const markedPhotoName = pathParse(markedPhotoPath);
      if (notMarkedPhotoName.name === markedPhotoName.name) {
        this.setState({
          matchedPathFiles: {
            ...this.state.matchedPathFiles,
            photoName,
            matchedPath: markedPhotoPath.split("public/").pop()
          }
        });
      }
    });
  };
  onHandleUserName = event => {
    this.setState({
      sharedData: {
        ...this.state.sharedData,
        userName: event.target.value
      }
    });
  };

  handleRemoveUploadedImage = filePath => {
    const {
      sharedData,
      imageData: { imagePath },
      zipData: { archivePath }
    } = this.state;
    let { imageData, zipData } = this.state;

    if (filePath === imagePath) {
      imageData = {
        ...imageData,
        imagePath: ""
      };
    } else if (filePath === archivePath) {
      zipData = {
        ...zipData,
        archivePath: ""
      };
    }
    this.setState({
      sharedData: {
        ...sharedData,
        isSuccessfullUploaded: false,
        inputValue: ""
      },
      zipData,
      imageData
    });
  };
  handleNextButtonClick = step => {
    const { imageData: { imagePath }, zipData: { archivePath } } = this.state;
    let { sharedData } = this.state;
    if (archivePath === "") {
      sharedData = { ...sharedData, isSuccessfullUploaded: false };
    } else {
      sharedData = { ...sharedData, isSuccessfullUploaded: true };
    }
    this.setState(
      {
        sharedData,
        isActiveScreen: step
      },
      () => {
        if (archivePath !== "" && imagePath !== "" && step === "third") {
          this.handleUnZipFile();
        }
      }
    );
  };

  handleBackButtonClick = isActiveScreen => {
    this.setState({
      isActiveScreen: isActiveScreen === "third" ? "second" : "first",
      sharedData: {
        ...this.state.sharedData,
        isSuccessfullUploaded: true
      }
    });
  };
  goBack = () => {
    console.log("home");
    this.setState({
      matchedPathFiles: {
        ...this.state.matchedPathFiles,
        matchedPath: ""
      }
    });
  };

  render() {
    const {
      matchedPathFiles,
      matchedPathFiles: { matchedPath },
      imageData,
      sharedData,
      zipData,
      isActiveScreen
    } = this.state;
    return (
      <div
        className={
          isActiveScreen !== "third" ? "card__popup" : "card__popup__gallery"
        }
      >
        <div className="card__popup__header">
          {(isActiveScreen !== "first" && matchedPath === "") && (
            <BackButton
              handleBackButtonClick={() => this.handleBackButtonClick(isActiveScreen)}
            >
            </BackButton>
          )}
          <DotIndicator isActiveScreen={isActiveScreen} />
        </div>
        {isActiveScreen === "first" && (
          <UploadImage
            sharedData={sharedData}
            imageData={imageData}
            onHandleUserName={event => this.onHandleUserName(event)}
            handleUploadFile={this.handleUploadFile}
            handleNextButtonClick={this.handleNextButtonClick}
            handleRemoveUploadedImage={this.handleRemoveUploadedImage}
          />
        )}
        {isActiveScreen === "second" && (
          <UploadZip
            sharedData={sharedData}
            zipData={zipData}
            handleUploadFile={this.handleUploadFile}
            handleNextButtonClick={this.handleNextButtonClick}
            handleRemoveUploadedImage={this.handleRemoveUploadedImage}
          />
        )}
        {isActiveScreen === "third" && (
          <ImageGallery
            sharedData={sharedData}
            goBack={this.goBack}
            zipData={zipData}
            matchedPathFiles={matchedPathFiles}
            handleClickedPhoto={this.handleClickedPhoto}
          />
        )}
      </div>
    );
  }
}

export default Home;
