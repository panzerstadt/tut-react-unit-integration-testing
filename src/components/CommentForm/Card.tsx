import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import styles from "./Card.module.css";

interface ImgProps {
  src: string;
}

const Img: React.FC<ImgProps> = ({ src }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;

    if (img && img.complete) {
      setImgLoaded(true);
    }

    return () => setImgLoaded(false);
  }, []);

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

  return (
    <motion.div
      className={styles.imgContainer}
      initial="hidden"
      animate={imgLoaded ? "visible" : "hidden"}
      variants={variants}
    >
      <img
        className={styles.img}
        src={src}
        alt="inspirational"
        ref={imgRef}
        onLoad={() => setImgLoaded(true)}
      />
    </motion.div>
  );
};

interface CardProps {
  comment?: string;
  author?: string;
  img: string;
}

const Card: React.FC<CardProps> = ({ comment, author, img }) => {
  return (
    <div className={styles.container}>
      <Img src={img} />
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

export default Card;
