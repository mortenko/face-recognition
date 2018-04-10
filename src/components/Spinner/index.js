import React from "react";
import Image from "components/Image";
import { PropTypes } from "prop-types";
import "./styles.css";

const Spinner  = ({ src }) => (
  <div className="spinner">
    <Image
      src={src}
    />
  </div>
);
Spinner.propTypes = {
  src: PropTypes.string.isRequired
};

export default Spinner;