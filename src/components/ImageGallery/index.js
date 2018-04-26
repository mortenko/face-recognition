// TODO implement FLOW
import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import { PropTypes } from "prop-types";
import downloadIcon from "assets/download_icon.svg";
import shareIcon from "assets/share_icon.svg";
import Image from "components/Image";
import Spinner from "components/Spinner";
import pathParse from "path-parse";

import GallerySpinner from "assets/gif/gallery_search.gif";
import "./styles.css";

@inject(stores => ({
  domainStore: stores.rootStore.domainStore,
  sharedStore: stores.rootStore.sharedStore
}))
@observer
export default class ImageGallery extends Component {
  static propTypes = {
    domainStore: PropTypes.shape({
      extractDir: PropTypes.string,
      getPhotos: PropTypes.array,
      downloadZip: PropTypes.func,
      handleClickedPhoto: PropTypes.func,
      getActualFetchState: PropTypes.func,
      removePhotoFromGallery: PropTypes.func,
      getArchiveDirZipPath: PropTypes.func
    }).isRequired,
    sharedStore: PropTypes.shape({
      userName: PropTypes.string,
      originalFileName: PropTypes.string
    })
  };
  static defaultProps = {
    sharedStore: PropTypes.shape({
      userName: "",
      originalFileName: ""
    })
  };
  render() {
    const { userName, originalFileName } = this.props.sharedStore;
    const {
      getPhotos,
      extractDir,
      handleClickedPhoto,
      removePhotoFromGallery,
      getActualFetchState
    } = this.props.domainStore;
    return (
      <div className="gallery">
        <Fragment>
          <div className="gallery__head">
            <div className="icon__group">
              <div className="icon__group__circle">
                <Image src={shareIcon} width={15} height={16} />
              </div>
              <div className="icon__group__circle">
                <a
                  href={`http://localhost:3003/file/download?photos=${JSON.stringify(
                    getPhotos
                  )}&extractedDir=${extractDir}`}
                  download
                >
                  <Image src={downloadIcon} width={15} height={16} />
                </a>
              </div>
            </div>
            <div className="gallery__head__text">
              We found these photos of
              <span className="gallery__head__userName"> {userName} </span> in
              &nbsp;&nbsp;
              <span className="gallery__head__originalFileName">
                {originalFileName}
              </span>
            </div>
          </div>
          <div className="gallery__content">
            {getActualFetchState === "pending" ? (
              <Spinner src={GallerySpinner} />
            ) : (
              getPhotos.map(relativePath => {
                const parseImgPath = pathParse(relativePath);
                return (
                  <div
                    className="gallery__photo"
                    onClick={() =>
                      handleClickedPhoto(relativePath, parseImgPath.base)
                    }
                  >
                    <Image
                      key={parseImgPath.name}
                      src={relativePath}
                      height={262}
                      width={200}
                      removeFile={event =>
                        removePhotoFromGallery(event, relativePath)
                      }
                      remove
                    />
                    <span className="gallery__photo__name">
                      {parseImgPath.base}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </Fragment>
      </div>
    );
  }
}
