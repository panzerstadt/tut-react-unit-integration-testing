import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
// if things start becoming too async (send data to parent, fetching)
// wrap it in act()

import CommentForm from "../../CommentForm";

// the goal for today AUG 14
describe("Comment Component", () => {
  test("adding a comment adds a comment to the comment list", () => {
    // Arrange
    const comments = [
      {
        comment: "The Way To Get Started Is To Quit Talking And Begin Doing.",
        author: "Walt Disney"
      },
      {
        comment:
          "The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.",
        author: "Winston Churchill"
      },
      {
        comment: "Don’t Let Yesterday Take Up Too Much Of Today.",
        author: "Will Rogers"
      }
    ];

    // Act
    // useEffect is run, all children components are mounted
    // basically exactly like a real react render
    const { getByTestId, queryAllByTestId, debug } = render(<CommentForm />);

    // these come from the child Form component
    const commentInput = getByTestId("comment-input");
    const commentAuthor = getByTestId("comment-author");
    const commentSubmit = getByTestId("comment-submit");

    // Assert
    comments.map((comment, i) => {
      fireEvent.change(commentInput, { target: { value: comment.comment } });
      fireEvent.change(commentAuthor, { target: { value: comment.author } });

      act(() => {
        fireEvent.click(commentSubmit);
      });

      const commentsList = queryAllByTestId("card-comment");
      const authorsList = queryAllByTestId("card-author");
      const newLength = i + 1;

      // expects there to be the same number of card elements
      // as the input comments list
      expect(commentsList.length).toBe(newLength);
      expect(authorsList.length).toBe(newLength);
    });
  });
});
