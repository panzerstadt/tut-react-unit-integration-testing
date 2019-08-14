import React from "react";
import { shallow } from "enzyme";

import ImageCard from "./index";

describe("ImageCard", () => {
  it("should render correctly", () => {
    const img = require("../../assets/19023.jpeg");
    const component = shallow(<ImageCard src={img} />);

    expect(component).toMatchSnapshot();
  });
});
