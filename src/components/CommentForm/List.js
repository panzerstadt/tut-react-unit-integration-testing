import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./List.module.css";

import Card from "./Card";
import { urls } from "../Unsplash";

const newImg = urls("nature", "small");

const List = ({ comments }) => {
  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    const handleResult = img => setImgs(p => [img, ...p]);

    const fetch = async () => {
      comments.map(v => newImg().then(handleResult));
    };
    if (comments && comments.length > 0) fetch();
  }, [comments]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.title}>
          Today's <strong>quotes</strong>
        </h3>
        <div className={styles.divider} />
        <br />
        {comments && comments.length > 0 ? (
          comments.map((v, i) => <Card key={i} img={imgs[i]} {...v} />)
        ) : (
          <h3 style={{ margin: "50px 0" }}>Loading</h3>
        )}
      </div>
    </div>
  );
};

List.propTypes = {
  comments: PropTypes.array.isRequired
};

export default List;
