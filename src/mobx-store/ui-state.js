import { types, flow, getRoot } from "mobx-state-tree";
import axios from "axios";

export const SharedModel = types
  .model("SharedModel", {
    activeScreen: "first",
    userName: "",
    isSuccessfullUploaded: false,
    inputValue: "",
    rootUniqueDirName: "",
    imagePath: "",
    archivePath: "",
    originalFileName: "",
    state: types.optional(types.enumeration("State", ["pending", "done", "error"]),"pending")
  }).views(self => ({
     get getDomainStore(){
      return getRoot(self).domainStore;
     }
  }))
  .actions(self => ({
    onHandleUserName(event) {
      self.userName = event.target.value;
    },
    handleUploadFile: flow(function* handleUploadFile(uploadedFile, fileType) {
  //    console.log(`uploadedFile: ${uploadedFile} fileType ${fileType}`);
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
        self.state = "done";
        if (fileType === "image") {
          self.imagePath = data.filePath;
          self.rootUniqueDirName = data.rootUniqueDirName;
          self.state = "done";
        } else if (fileType === "zip") {
          self.archivePath = data.filePath;
          self.originalFileName = data.originalFileName;
        }
      } catch (error) {
        console.log(error);
        self.state = "error";
      }
    }),
    goToNextScreen(step) {
      self.archivePath === ""
        ? (self.isSuccessfullUploaded = false)
        : (self.isSuccessfullUploaded = true);

      self.activeScreen = step;
      if (
        self.archivePath !== "" &&
        self.imagePath !== "" &&
        step === "third"
      ) {
        self.getDomainStore.handleUnZipFile();
      }
    },
    removeUploadedFile(fileType) {
      if (fileType === "image") {
        self.imagePath = "";
      } else if (fileType === "zip") {
        self.zipPath = "";
      }
      self.isSuccessfullUploaded = false;
      self.inputValue = "";
    },
    goToPreviousScreen(activeScreen) {
      if (activeScreen === "third") {
        self.activeScreen = "second";
      } else {
        self.activeScreen = "first";
      }
      self.isSuccessfullUploaded = true;
    }
  }));

