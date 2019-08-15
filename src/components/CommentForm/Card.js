import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import styles from "./Card.module.css";

const variants = {
  hidden: {
    opacity: 0,
    x: -100
  },
  visible: {
    opacity: 1,
    x: 0
  }
};

const Card = ({ comment, author, img }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  useEffect(() => {
    setImgLoaded(false);
  }, [img]);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.imgContainer}
        initial="hidden"
        animate={imgLoaded ? "visible" : "hidden"}
        variants={variants}
      >
        <img
          className={styles.img}
          src={img}
          alt="inspirational image"
          onLoad={() => setImgLoaded(true)}
        />
      </motion.div>
      <div className={styles.contentContainer}>
        <h3 data-testid="card-comment" className={styles.comment}>
          {comment || "React Testing Library is great"}
        </h3>
        <p data-testid="card-author" className={styles.author}>
          {author || "Luke someguy"}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  comment: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

export default Card;
