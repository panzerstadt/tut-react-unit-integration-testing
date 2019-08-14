import React from "react";
import { PropTypes } from "prop-types";

import styles from "./index.module.css";

const ImageCard = ({ src, title, author }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={src} alt="image" />
      </div>
      <div className={styles.textContainer}>
        <h2>{title}</h2>
        <span>{author}</span>
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  author: PropTypes.string
};

export default ImageCard;
