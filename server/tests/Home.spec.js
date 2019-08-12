import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { Home } from '../../src/components/Home';
import MenuBar from '../../src/components/MenuBar';
import Products from '../../src/components/Products';

configure({ adapter: new Adapter() });

//first try at a functional react component test.

describe('<Home/>', () => {
  it('renders the home component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(MenuBar)).toHaveLength(1);
    expect(wrapper.find(Products)).toHaveLength(1);
  });
});
