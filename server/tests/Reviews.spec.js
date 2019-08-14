import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { Reviews } from '../../src/components/Reviews';

configure({ adapter: new Adapter() });

const mockUser = {
  id: '456',
};
const mockReviews = {
  reviews: [
    { title: 'review1', body: 'stuff', productId: '123', userId: '456' },
    { title: 'review1', body: 'more stuff', productId: 'abc', userId: 'def' },
  ],
};
const mockFunction = jest.fn();
const mockDeleteReview = jest.fn();

describe('<Reviews/>', () => {
  it('renders the Reviews component present', () => {
    const wrapper = shallow(
      <Reviews
        listReviews={mockFunction}
        user={mockUser}
        reviews={mockReviews}
        deleteReview={mockDeleteReview}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Calls the correct function to delete a review', () => {
    const wrapper = shallow(
      <Reviews
        listReviews={mockFunction}
        user={mockUser}
        reviews={mockReviews}
        deleteReview={mockDeleteReview}
      />,
    );
    const deleteButton = wrapper.find('.review-delete');
    deleteButton.simulate('click');
    expect(mockDeleteReview).toHaveBeenCalledTimes(1);
    expect(mockDeleteReview).toHaveBeenCalledWith({
      title: 'review1',
      body: 'stuff',
      productId: '123',
      userId: '456',
    });
  });
});
