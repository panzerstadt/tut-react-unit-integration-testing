import React from "react";
import PropTypes from "prop-types";

import styles from "./List.module.css";

import Card from "./Card";

const List = ({ comments }) => {
  return (
    <div className={styles.container}>
      {comments.map((v, i) => (
        <Card key={i} {...v} />
      ))}
    </div>
  );
};

List.propTypes = {
  comments: PropTypes.array.isRequired
};

export default List;
