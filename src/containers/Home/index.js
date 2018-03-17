import React, { Component } from "react";
import axios from "axios";
import UploadImage from "components/UploadImage";
import UploadZip from "components/UploadZip";
import ImageGallery from "components/ImageGallery";
import DotIndicator from "components/DotIndicator";
import arrowBack from "assets/back_icon.png";
import pathParse from "path-parse";
import "./styles.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
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
        matchedPath: ""
      }
    };
    this.handleUnZipFile = this.handleUnZipFile.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

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
      console.count("calling setState");
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
  getMatchedPhotoPath = path => {
    const { matchedPathFiles: { marked_photos } } = this.state;
    const notMarkedPhotoName = pathParse(path);
    marked_photos.forEach(markedPhotoPath => {
      const markedPhotoName = pathParse(markedPhotoPath);
      if (notMarkedPhotoName.name === markedPhotoName.name) {
        this.setState({
          matchedPathFiles: {
            ...this.state.matchedPathFiles,
            matchedPath: markedPhotoPath.split("public/").pop()
          }
        });
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
    console.count("calling setState");
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

  onHandleUserName = event => {
    console.count("calling setState");
    this.setState({
      sharedData: {
        ...this.state.sharedData,
        userName: event.target.value
      }
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
    console.count("calling setState");
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
        matchedPath: "",
      }
    });
  };

  render() {
    console.log(this.state);
    const {
      matchedPathFiles,
      matchedPathFiles: { matchedPath },
      isActiveScreen,
      imageData,
      sharedData,
      zipData
    } = this.state;
    return (
      <div
        className={
          isActiveScreen !== "third"
            ? "card-popup-container"
            : "card-popup-gallery"
        }
      >
        {matchedPath === "" && (
          <div className="card-header">
            {isActiveScreen !== "first" && (
              <div
                className="card-back-icon"
                onClick={() => this.handleBackButtonClick(isActiveScreen)}
              >
                <img src={arrowBack} alt="arrow_back" />
              </div>
            )}
            <DotIndicator isActiveScreen={isActiveScreen} />
          </div>
        )}
        {isActiveScreen === "first" && (
          <UploadImage
            sharedData={sharedData}
            imageData={imageData}
            onHandleUserName={this.onHandleUserName}
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
            getMatchedPhotoPath={this.getMatchedPhotoPath}
          />
        )}
      </div>
    );
  }
}
export default Home;
