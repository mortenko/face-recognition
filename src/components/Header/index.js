import React from "react";
import { Link } from "react-router-dom";
import Image from "components/Image";
import faceLogo from "assets/face_logo.svg";
import womanHead from "assets/woman_head.svg";
import "./styles.css";

const Header = () => (
  <header className="header">
    <div className="header__logo">
      <Image src={faceLogo} />
      <span className="header__logo__text">machine learning system</span>
    </div>
    <div>
      <ul>
        <li>
          <Link to="#Help">Help</Link>
        </li>
        <li>
          <Link to="#aboutUs">About Us</Link>
        </li>
        <li>
          <Link to="#goPremium">Go Premium ! </Link>
        </li>
      </ul>
      <div className="header__woman">
        <Image src={womanHead} />
      </div>
    </div>
  </header>
);

export default Header;
