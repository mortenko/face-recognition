import React from "react";
import UploadImage from "components/UploadImage";
import { observer, inject } from "mobx-react";
import { BackButton } from "components/Button";
import UploadZip from "components/UploadZip";
import ImageGallery from "components/ImageGallery";
import DotIndicator from "components/DotIndicator";
import "./styles.css";

const Root = inject(stores => ({
  activeScreen: stores.rootStore.sharedStore.activeScreen,
  goToPreviousScreen: stores.rootStore.sharedStore.goToPreviousScreen,
  matchedPath: stores.rootStore.domainStore.matchedPath
}))(
  observer(({ activeScreen, goToPreviousScreen, matchedPath }) => {
    return (
      <div
        className={
          activeScreen !== "third" ? "card__popup" : "card__popup__gallery"
        }
      >
        <div className="card__popup__header">
          {activeScreen !== "first" &&
            matchedPath === "" && (
              <BackButton
                handleBackButtonClick={() =>
                  goToPreviousScreen(activeScreen)
                }
              />
            )}
          <DotIndicator activeScreen={activeScreen} />
        </div>
        {activeScreen === "first" && <UploadImage />}
        {activeScreen === "second" && <UploadZip />}
        {activeScreen === "third" && <ImageGallery />}
      </div>
    );
  })
);
export default Root;
