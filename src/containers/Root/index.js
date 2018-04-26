import React from "react";
import UploadImage from "components/UploadImage";
import { observer, inject } from "mobx-react";
import { BackButton } from "components/Button";
import UploadZip from "components/UploadZip";
import ImageGallery from "components/ImageGallery";
import MarkedPhotoDetail from "components/MarkedPhotoDetail";
import DotIndicator from "components/DotIndicator";
import "./styles.css";

const Root = inject(stores => ({
  sharedStore: stores.rootStore.sharedStore,
  matchedPath: stores.rootStore.domainStore.matchedPath
}))(
  observer(
    ({
      sharedStore: { activeScreen, goToPreviousScreen, setUIStyle },
      matchedPath
    }) => {
      return (
        <div className={setUIStyle}>
          <div className="card__popup__header">
            {activeScreen !== "first" &&
              matchedPath === "" && (
                <BackButton
                  handleBackButtonClick={() => goToPreviousScreen(activeScreen)}
                />
              )}
            <DotIndicator activeScreen={activeScreen} />
          </div>
          {activeScreen === "first" && <UploadImage />}
          {activeScreen === "second" && <UploadZip />}
          {activeScreen === "third" && matchedPath === "" && <ImageGallery />}
          {activeScreen === "third" && matchedPath !== "" && <MarkedPhotoDetail />}
        </div>
      );
    }
  )
);
export default Root;
