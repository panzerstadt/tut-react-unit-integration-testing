import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { fireEvent } from "@testing-library/react";

import styles from "./Form.module.css";

const Form = ({ onSubmit }) => {
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = e => {
    onSubmit && onSubmit({ comment: comment, author: author });
    setComment("");
    setAuthor("");
    e.preventDefault();
  };

  useEffect(() => {
    if (comment.length > 5 && author.length > 5) {
      isDisabled && setIsDisabled(false);
    } else {
      !isDisabled && setIsDisabled(true);
    }
  }, [comment, author]);

  const ref = useRef();
  // useEffect(() => {
  //   if (ref) {
  //     const el = ref.current;
  //     // holy shit this works
  //     fireEvent.change(el, {
  //       target: {
  //         value: "yo this is some magical input fired by @testing-library/react"
  //       }
  //     });
  //   }
  // }, [ref]);

  return (
    <form
      data-testid="comment-form"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <textarea
        ref={ref}
        data-testid="comment-input"
        name="comment"
        id="comment"
        cols="30"
        rows="10"
        onChange={e => setComment(e.target.value)}
        value={comment}
      />
      <input
        data-testid="comment-author"
        name="author"
        type="text"
        placeholder="input your name"
        onChange={e => setAuthor(e.target.value)}
        value={author}
      />
      <button data-testid="comment-submit" type="submit" disabled={isDisabled}>
        submit
      </button>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func
};

export default Form;
