import { types, flow, getRoot } from "mobx-state-tree";
import axios from "axios";
import pathParse from "path-parse";

export const DomainModel = types
  .model("DomainModel", {
    marked_photos: types.optional(types.array(types.string), []),
    photos: types.optional(types.array(types.string), []),
    matchedPath: "",
    photoName: "",
    state: types.optional(types.enumeration("State", ["pending", "done", "error"]),"pending")
  })
  .views(self => ({
    get getSharedStore() {
      return getRoot(self).sharedStore
    },
    get getActualState() {
      return self.state
    }
  }))
  .actions(self => ({
    handleUnZipFile: flow(function* handleUnZipFile() {
      const {
        userName,
        imagePath,
        archivePath,
        originalFileName,
        rootUniqueDirName
      } = self.getSharedStore;
      self.state = "pending";
      try {
        const { data } = yield axios.post("/file/unzip", {
          userName,
          imagePath,
          archivePath,
          originalFileName,
          rootUniqueDirName
        });
        self.state = "done";
        self.marked_photos = data.marked_photos;
        self.photos = data.photos;
      } catch (error) {
        self.state = "error";
        throw new Error(error);
      }
    }),
    handleClickedPhoto: (path, photoName) => {
      const photoPath = pathParse(path);
      self.marked_photos.forEach(markedPhotoPath => {
        const markedPhotoName = pathParse(markedPhotoPath);
        if (photoPath.name === markedPhotoName.name) {
          self.photoName = photoName;
          self.matchedPath = markedPhotoPath.split("public/").pop();
        }
      });
    },
    goBackToGallery: () => {
      self.matchedPath = "";
    },
    removePhotoFromGallery: () => {
      console.log("remove file");
    }
  }));
