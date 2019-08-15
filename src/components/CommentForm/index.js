import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import useFetchDummy from "./useFetchDummy";
import List from "./List";
import Form from "./Form";

import styles from "./index.module.css";

const parent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 1,
      delayChildren: 2,
      delay: 0.7
    }
  }
};

const children = {
  hidden: { y: 100 },
  visible: {
    y: 0,
    transition: { delay: 1 }
  }
};

const CommentForm = () => {
  const [comments, setComments] = useState([]);
  const handleSubmit = v => {
    setComments(prev => {
      return [v, ...prev];
    });
  };

  // initial load of other existing stuff
  // mocked by fetching from httpbin with local data
  const state = useFetchDummy();
  useEffect(() => {
    if (state.data.json) {
      const commentsData = state.data.json.comments.reverse();
      setComments(commentsData);
    }
  }, [state]);

  // will this be mocked on the test? ANSWER: yes
  // useEffect(() => {
  //   setComments(props.comments);
  // }, [props.comments]);

  return (
    <motion.div
      key="comment-container"
      data-testid="comment-component"
      className={styles.container}
      initial="hidden"
      animate="visible"
      variants={parent}
    >
      <motion.div
        key="comment-form"
        variants={children}
        style={{ display: "contents" }}
      >
        <Form onSubmit={handleSubmit} />
      </motion.div>

      <motion.div
        key="comment-list"
        variants={children}
        style={{ display: "contents" }}
      >
        <List comments={comments} />
      </motion.div>
    </motion.div>
  );
};

export default CommentForm;
