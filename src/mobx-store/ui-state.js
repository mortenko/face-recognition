import { types, flow } from "mobx-state-tree";
import axios from "axios";
import makeInspectable from "mobx-devtools-mst";

const ImageModel = types.model("ImageModel", {
  imagePath: types.string
});

const ZipModel = types.model("ZipModel", {
  archivePath: "",
  originalFileName: ""
});

export const SharedModel = types
  .model("SharedModel", {
    isActiveScreen: types.string,
    userName: types.string,
    isSuccessfullUploaded: types.boolean,
    inputValue: types.string,
    rootUniqueDirName: types.string,
    imageData: types.optional(ImageModel, {
      imagePath: ""
    }),
    zipData: types.optional(ZipModel, {
      archivePath: "",
      originalFileName: ""
    }),

    state: types.enumeration("State", ["pending", "done", "error"])
  })
  .actions(self => ({
    onHandleUserName(event) {
      self.userName = event.target.value;
    },
    handleUploadFile: flow(function* handleUploadFile(uploadedFile, fileType) {
      console.log(`uploadedFile: ${uploadedFile} fileType ${fileType}`);
      const file = uploadedFile.target.files[0];
      const formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      formData.append("file", file);
      formData.append("rootUniqueDirName", self.rootUniqueDirName);
      self.state = "pending";
      try {
        const { data } = yield axios.post("/file/upload", formData, config);
        self.isSuccessfullUploaded = true;
        console.log("data", data);
        if (fileType === "image") {
          self.imageData = { imagePath: data.filePath };
          self.rootUniqueDirName = data.rootUniqueDirName;
          self.state = "done";
        } else if (fileType === "zipFile") {
          // this.setState({
          //   zipData: {
          //     archivePath: data.filePath,
          //     originalFileName: data.originalFileName
          //   },
          //   sharedData
          // });
        }
      } catch (error) {
        console.log(error);
        self.state = "error";
      }
    }),
    handleNextButtonClick(step) {
      const { archivePath } = self.zipData;
      const { imagePath } = self.imageData;
      if (archivePath === "") {
        self.sharedData = { isSuccessfullUploaded: false };
      } else {
        self.sharedData = { isSuccessfullUploaded: true };
      }
      self.isActiveScreen = step;
      if (archivePath !== "" && imagePath !== "" && step === "third") {
        self.handleUnZipFile();
      }
    },
    handleUnZipFile() {
      console.log("handleUnZipFile");
    }
  }));
