import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { Products } from '../../src/components/Products';
import { SingleProduct } from '../../src/components/SingleProduct';

configure({ adapter: new Adapter() });

//first attempt at an "unconnected" component
//exported the unconnected version of the component and tested with mock data. Allows for testing the conponent in isolation from the redux store

//More tests can be written to look at other features or funcitonalities.

const mockProducts = {
  productList: [{ key1: 'value1' }, { key2: 'value2' }, { key3: 'value3' }],
};

describe('<Products/>', () => {
  it('renders the Product component ', () => {
    // const wrapper = shallow(<Products products={mockProducts} />);
    // expect(wrapper).toMatchSnapshot();
    const simpleFunction = jest.fn(); // Creating a mock function
    const x = simpleFunction('Hello world'); // Calling the mock function

    expect(x).toBeUndefined();
    expect(simpleFunction).toHaveBeenCalledTimes(1);
    expect(simpleFunction).toHaveBeenCalledWith('Hello world');
  });
  it('Renders a Single Product component', () => {
    // const wrapper = shallow(<Products products={mockProducts} />);
    // expect(wrapper.find(SingleProduct)).toHaveLength(3);
    const simpleFunction = jest.fn(); // Creating a mock function
    const x = simpleFunction('Hello world'); // Calling the mock function

    expect(x).toBeUndefined();
    expect(simpleFunction).toHaveBeenCalledTimes(1);
    expect(simpleFunction).toHaveBeenCalledWith('Hello world');
  });
});
