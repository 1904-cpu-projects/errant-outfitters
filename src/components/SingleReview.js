import React from "react";
import { singleReviewThunk } from "../actions/reviewActions";
import { connect } from "react-redux";

const SingleReview = props => {
  return <div />;
};

const mapStateToProps = state => ({ review: state.review });

const mapDispatchToProps = dispatch => ({
  review: id => dispatch(singleReviewThunk(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleReview);
