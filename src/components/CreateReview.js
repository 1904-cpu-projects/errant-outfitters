import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postReviewThunk } from '../actions/reviewActions';

class CreateReview extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: '',
      productId: '',
      userId: '',
    };
    this.onHandle = this.onHandle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onHandle(event) {
    this.setState({
      [event.target.name]: event.target.value,
      productId: this.props.product.id,
      userId: this.props.user.id,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.postReview(this.state);
    this.setState({
      title: '',
      body: '',
      productId: '',
      userId: '',
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="title">Title: </label>
          <input
            name="title"
            value={this.state.title}
            type="text"
            onChange={this.onHandle}
          />
          <label htmlFor="body">Please enter your review: </label>
          <input
            name="body"
            type="text"
            value={this.state.body}
            onChange={this.onHandle}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => {
  return {
    postReview: stuff => dispatch(postReviewThunk(stuff)),
  };
};

CreateReview.defaultProps = {
  product: {},
  user: {},
};

CreateReview.propTypes = {
  product: PropTypes.object,
  postReview: PropTypes.func,
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateReview);
