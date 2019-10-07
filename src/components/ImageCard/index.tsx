import React from "react";

import styles from "./index.module.css";

interface Props {
  src: string;
  title?: string;
  author?: string;
}

const ImageCard: React.FC<Props> = ({ src, title, author }) => {
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


export default ImageCard;
