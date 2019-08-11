import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, render } from "enzyme";
import { Home } from "../../src/components/Home";

configure({ adapter: new Adapter() });

describe("Correctly renders main components component", () => {
  it("renders the home component present", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});
