import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Form from "../Form";

describe("Comment Form", () => {
  test("should call onSubmit when input data is complete", () => {
    // Arrange
    // not used

    // Act
    const { getByTestId } = render(<Form />);

    // Assert
    const commentInput = getByTestId("comment-input");
    const commentAuthor = getByTestId("comment-author");
    const submitButton = getByTestId("comment-submit");

    // assert existence
    expect(commentInput).toBeDefined();
    expect(commentAuthor).toBeDefined();
    expect(submitButton).toBeDefined();
  });

  test("add comment is disabled until both the comment text field and 'Your name' text field are both filled in", () => {
    // Arrange
    // mock onSubmit callback
    const onSubmit = jest.fn();
    const comment = "this is a comment";
    const author = "this is its author";

    // Act
    const { getByTestId, debug } = render(<Form />);

    // Assert
    // these are html elements
    const commentInput = getByTestId("comment-input");
    const commentAuthor = getByTestId("comment-author");
    const submitButton = getByTestId("comment-submit");

    expect(submitButton.disabled).toEqual(true);
    fireEvent.change(commentInput, { target: { value: comment } });
    expect(submitButton.disabled).toEqual(true);
    fireEvent.change(commentAuthor, { target: { value: author } });
    expect(submitButton.disabled).toEqual(false); // when filled in, button should be enabled
  });

  // test("adding a comment adds a comment to the comment list", () => {
  //   // the goal for today AUG 14
  // });
});
