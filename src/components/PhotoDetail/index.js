import React, { Component } from "react";
import { Button } from "components/Button";
import shareIcon from "assets/share_icon.png";
import downloadIcon from "assets/download_icon.png";
import "./styles.css";

export default class PhotoDetail extends Component {

  goBack = () => {
    console.log("PhotoDetail");
    this.props.goBack();
  };


  render() {
    const { matchedPath } = this.props;
    return (
      <div className="photo-container">
        <div className="photo-header">
          <Button onClick={this.goBack}> Back </Button>
          <div className="gallery-icon-group">
            <div className="gallery-icon-circle">
              <img src={shareIcon} width={15} height={16} alt="share_icon" />
            </div>
            <div className="gallery-icon-circle">
              <img
                src={downloadIcon}
                width={15}
                height={16}
                alt="download_icon"
              />
            </div>
          </div>
        </div>
       <div className="marked-photo">
        <img src={matchedPath} width={300} height={300} alt="detail_photo" />
       </div>
      </div>
    );
  }
}
