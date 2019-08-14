import React from "react";
import { render } from "@testing-library/react";

import List from "../List";

describe("Comment List", () => {
  test("it renders the list of comment cards with their comment and author tag", () => {
    // Arrange
    const comment1 = {
      id: 1,
      comment: "I do love writing tests",
      author: "no tester ever"
    };
    const comment2 = {
      id: 2,
      comment: "Nothing is better than a good comment app",
      author: "Comment Hater"
    };

    const props = {
      comments: [comment1, comment2]
    };

    // Act
    const { getByText } = render(<List {...props} />);

    // Assert
    const commentNode1 = getByText(comment1.comment);
    const commentNode2 = getByText(comment2.comment);
    const authorNode1 = getByText(comment1.author);
    const authorNode2 = getByText(comment2.author);

    expect(commentNode1).toBeDefined();
    expect(commentNode2).toBeDefined();
    expect(authorNode1).toBeDefined();
    expect(authorNode2).toBeDefined();
  });
});
