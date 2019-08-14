import React from "react";

import List from "./List";
import Form from "./Form";

const CommentForm = () => {
  const props = {
    comments: [
      {
        id: 1,
        comment: "this is the first comment",
        author: "first dude"
      },
      {
        id: 2,
        comment: "this be they seconde comment aye!",
        author: "second pirate dude"
      },
      {
        id: 3,
        comment: "prithee thus be thy third commente to thee",
        author: "third gentleman"
      }
    ]
  };
  return (
    <div>
      <Form />
      <br />
      <List {...props} />
    </div>
  );
};

export default CommentForm;
