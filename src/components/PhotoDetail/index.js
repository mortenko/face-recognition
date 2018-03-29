import React, { Component } from "react";
import { Button } from "components/Button";
import Image from "components/Image";
import shareIcon from "assets/share_icon.svg";
import downloadIcon from "assets/download_icon.svg";
import "./styles.css";

export default class PhotoDetail extends Component {
  goBack = () => {
    this.props.goBack();
  };
  render() {
    const { matchedPath, userName, photoName } = this.props;
    return (
      <div className="photo">
        <div className="photo__header">
          <Button onClick={this.goBack}> Back </Button>
          <div className="photo__icon__group">
            <div className="photo__icon__circle">
              <Image src={shareIcon} width={15} height={16} alt="share_icon" />
            </div>
            <div className="photo__icon__circle">
              <Image
                src={downloadIcon}
                width={15}
                height={16}
                alt="download_icon"
              />
            </div>
          </div>
        </div>
        <div className="photo__marked">
          <Image
            src={matchedPath}
            width={300}
            height={300}
            alt="detail_photo"
          />
          <span>{userName} in {photoName}</span>
        </div>
      </div>
    );
  }
}
