import React, { useState, useEffect } from "react";

import useFetchDummy from "./useFetchDummy";
import List from "./List";
import Form from "./Form";

import styles from "./index.module.css";

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
    <div data-testid="comment-component" className={styles.container}>
      <Form onSubmit={handleSubmit} />
      <List comments={comments} />
    </div>
  );
};

export default CommentForm;
