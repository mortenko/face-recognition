import { types, flow, getRoot } from "mobx-state-tree";
import axios from "axios";
import pathParse from "path-parse";

export const DomainModel = types
  .model("DomainModel", {
    marked_photos: types.optional(types.array(types.string), []),
    photos: types.optional(types.array(types.string), []),
    originalPath: "",
    matchedPath: "",
    extractDir: "",
    photoName: "",
    fetchState: types.optional(
      types.enumeration("State", ["pending", "done", "error"]),
      "pending"
    )
  })
  .views(self => ({
    get getSharedStore() {
      return getRoot(self).sharedStore;
    },
    get getActualFetchState() {
      return self.fetchState;
    },
    get getPhotos() {
      return self.photos;
    },
    get getOriginalPath() {
      return self.originalPath;
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

      self.fetchState = "pending";
      try {
        const { data: { pythonResponse, extractDir } } = yield axios.post(
          "/file/unzip",
          {
            userName,
            imagePath,
            archivePath,
            originalFileName,
            rootUniqueDirName
          }
        );
        const photoData = JSON.parse(pythonResponse);
        self.extractDir = extractDir;
        self.marked_photos = self.parsePhotoPath(photoData.marked_photos);
        self.photos = self.parsePhotoPath(photoData.photos);
        self.fetchState = "done";
      } catch (error) {
        self.fetchState = "error";
      }
    }),
    handleClickedPhoto: (filePath, photoName) => {
      const photoPath = pathParse(filePath);
      self.originalPath = filePath;
      self.marked_photos.forEach(markedPhotoPath => {
        const markedPhotoName = pathParse(markedPhotoPath);
        if (photoPath.name === markedPhotoName.name) {
          self.photoName = photoName;
          self.matchedPath = markedPhotoPath;
        }
      });
    },
    parsePhotoPath: photoPath => {
      let parsedPath = null;
      if (Array.isArray(photoPath)) {
        return photoPath.map(path => {
          parsedPath = path.split("public/").pop();
          return parsedPath;
        });
      }
      parsedPath = photoPath.split("public/").pop();
      return parsedPath;
    },
    goBackToGallery: () => {
      self.matchedPath = "";
    },
    removePhotoFromGallery: flow(function* removePhotoFromGallery(
      event,
      filePath
    ) {
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
