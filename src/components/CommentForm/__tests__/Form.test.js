import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Form from "../Form";

describe("Comment Form", () => {
  test("should call onSubmit when input data is complete", () => {
    // Arrange
    const onSubmit = jest.fn().mockImplementation(v => v);
    const comment = "this is a comment";
    const author = "this is its author";

    // Act
    const { getByTestId } = render(<Form onSubmit={onSubmit} />);

    // Assert
    const commentInput = getByTestId("comment-input");
    const commentAuthor = getByTestId("comment-author");
    const submitButton = getByTestId("comment-submit");

    // assert existence
    expect(commentInput).toBeDefined();
    expect(commentAuthor).toBeDefined();
    expect(submitButton).toBeDefined();

    // fill in form and submit
    fireEvent.change(commentInput, { target: { value: comment } });
    fireEvent.change(commentAuthor, { target: { value: author } });
    fireEvent.click(submitButton);
    expect(onSubmit).toBeCalled();

    // check if the right stuff is returned
    const results = onSubmit.mock.results[0].value;
    expect(results).toHaveProperty("comment", comment);
    expect(results).toHaveProperty("author", author);
  });

  test("add comment is disabled until both the comment text field and 'Your name' text field are both filled in", () => {
    // Arrange
    // mock onSubmit callback
    const onSubmit = jest.fn();
    const comment = "this is a comment";
    const author = "this is its author";

    // Act
    const { getByTestId } = render(<Form />);

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

  test("should clear input areas when submit button is called", () => {
    // Arrange
    // mock onSubmit callback
    const comment = "this is a comment";
    const author = "this is its author";

    // Act
    const { getByTestId, getByDisplayValue, debug } = render(<Form />);

    // Assert
    // these are html elements
    const commentInput = getByTestId("comment-input");
    const commentAuthor = getByTestId("comment-author");
    const submitButton = getByTestId("comment-submit");

    // initially empty
    expect(commentInput.value).toBe("");
    expect(commentAuthor.value).toBe("");

    // fill in form
    fireEvent.change(commentInput, { target: { value: comment } });
    fireEvent.change(commentAuthor, { target: { value: author } });
    expect(commentInput.value).toBe(comment);
    expect(commentAuthor.value).toBe(author);

    // this is expected to clear the inputs
    fireEvent.click(submitButton);

    // expect inputs to be cleared
    expect(commentInput.value).toBe("");
    expect(commentAuthor.value).toBe("");
  });
});
