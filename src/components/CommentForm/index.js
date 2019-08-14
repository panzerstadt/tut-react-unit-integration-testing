import React, { useState, useEffect } from "react";

import List from "./List";
import Form from "./Form";

const props = {
  comments: [
    {
      id: 1,
      comment: "The Way Get Started Is To Quit Talking And Begin Doing.",
      author: "Walt Disney"
    },
    {
      id: 2,
      comment:
        "The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.",
      author: "Winston Churchill"
    },
    {
      id: 3,
      comment: "Don’t Let Yesterday Take Up Too Much Of Today.",
      author: "Will Rogers"
    }
  ]
};

const CommentForm = () => {
  const [comments, setComments] = useState([]);
  const handleSubmit = v => {
    setComments(prev => {
      return [...prev, v];
    });
  };

  // will this be mocked on the test? ANSWER: yes
  // useEffect(() => {
  //   setComments(props.comments);
  // }, [props.comments]);

  return (
    <div data-testid="comment-component">
      <Form onSubmit={handleSubmit} />
      <br />
      <List comments={comments} />
    </div>
  );
};

export default CommentForm;
