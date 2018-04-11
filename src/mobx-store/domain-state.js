import { types, flow, getRoot } from "mobx-state-tree";
import axios from "axios";
import pathParse from "path-parse";

export const DomainModel = types
  .model("DomainModel", {
    marked_photos: types.optional(types.array(types.string), []),
    photos: types.optional(types.array(types.string), []),
    matchedPath: "",
    photoName: "",
    state: types.optional(
      types.enumeration("State", ["pending", "done", "error"]),
      "pending"
    )
  })
  .views(self => ({
    get getSharedStore() {
      return getRoot(self).sharedStore;
    },
    get getActualState() {
      return self.state;
    },
    get getPhotos() {
      return self.photos;
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
        self.marked_photos = self.parsePhotoPath(data.marked_photos);
        self.photos = self.parsePhotoPath(data.photos);
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
          self.matchedPath = markedPhotoPath;
        }
      });
    },
    parsePhotoPath: photoPath => {
      return photoPath.map(path => {
        const parsedPath = path.split("public/").pop();
        return parsedPath;
      });
    },
    goBackToGallery: () => {
      self.matchedPath = "";
    },
    removePhotoFromGallery: flow(function*(event, filePath) {
      event.stopPropagation();
      try {
        yield axios.post(`/file/remove`, { filePath });
        self.photos = self.photos.filter(photoPath => {
          return photoPath !== filePath;
        });
      } catch (error) {
        throw new Error(error);
      }
    })
  }));
