import React from "react";
import { render } from "@testing-library/react";

import Card from "../Card";

describe("Comment Card", () => {
  test("it renders the comment and the author", () => {
    // Arrange
    // prepare inputs, mocking also lives here
    const props = {
      comment: "we start with Arrange, then Act, then Assert",
      author: "Kent C Dodds"
    };

    // Act
    // this involves rendering the component with the previously implemented props
    const { getByText } = render(<Card {...props} />);

    // Assert
    const commentNode = getByText(props.comment);
    const authorNode = getByText(props.author);

    expect(commentNode).toBeDefined();
    expect(authorNode).toBeDefined();
  });
});
