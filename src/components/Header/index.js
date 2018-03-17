import React from "react";
import { Link } from "react-router-dom";
import logo from "assets/fr_logo.png";
import womanHead from "assets/woman_head.png";
import "./styles.css";

const Header = () => (
  <header className="header">
    <div className="ml-logo">
      <img src={logo} width={63} height={44} alt="logo" />
      <span className="ml-text">machine learning system</span>
    </div>
    <div>
      <ul>
        <li>
          <Link to="#Help">Help</Link> <div className="splitter" />
        </li>
        <li>
          <Link to="#aboutUs">About Us</Link>
        </li>
        <li>
          <Link to="#goPremium">Go Premium ! </Link>
        </li>
      </ul>
      <div className="woman-head-picture">
        <img src={womanHead} alt="woman_head" />
      </div>
    </div>
  </header>
);

export default Header;
