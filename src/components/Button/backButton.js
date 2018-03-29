import React from "react";
import arrowBack from "assets/back_icon.svg";
import Image from "../Image";

const BackButton = props => {
  const { handleBackButtonClick } = props;
  return (
    <div className="button--back" onClick={handleBackButtonClick}>
      <Image src={arrowBack} />
    </div>
  );
};

export default BackButton;