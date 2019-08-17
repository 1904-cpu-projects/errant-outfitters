import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  reviews: state.reviews,
});

const mapDispatchToProps = dispatch => {
  return {
    listReviews: () => dispatch(listReviewsThunk()),
    deleteReview: review => dispatch(deleteReviewThunk(review)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reviews);
