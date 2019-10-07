import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

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
      <div className={styles.contentContainer}>
        <h3 className={styles.title}>
          <strong>Write</strong> something
        </h3>
        <div className={styles.divider} />
        <br />
        <textarea
          ref={ref}
          className={styles.comments}
          data-testid="comment-input"
          name="comment"
          id="comment"
          cols="20"
          rows="2"
          placeholder="something inspirational to start your day."
          onChange={e => setComment(e.target.value)}
          value={comment}
        />
        <input
          className={styles.author}
          data-testid="comment-author"
          name="author"
          type="text"
          placeholder="enter your name. it's your claim to fame."
          onChange={e => setAuthor(e.target.value)}
          value={author}
        />
        <br />
        <button
          className={styles.btn}
          data-testid="comment-submit"
          type="submit"
          disabled={isDisabled}
        >
          submit
        </button>
      </div>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func
};

export default Form;
