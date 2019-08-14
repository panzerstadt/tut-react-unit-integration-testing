import React from "react";
import PropTypes from "prop-types";

import styles from "./Card.module.css";

const Card = ({ comment, author }) => {
  return (
    <div className={styles.container}>
      <h3 data-testid="card-comment" className={styles.comment}>
        {comment || "React Testing Library is great"}
      </h3>
      <p data-testid="card-author" className={styles.author}>
        {author || "Luke someguy"}
      </p>
    </div>
  );
};

Card.propTypes = {
  comment: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

export default Card;
