import React from "react";
import { listReviews, deleteReview } from "../actions/reviewActions";
import { connect } from "react-redux";

let filteredReviews;

class Reviews extends React.Component {
  componentDidMount() {
    this.props.listReviews();
  }

  render() {
    const { reviews } = this.props.reviews;

    // if (!this.props.user.id === undefined) return null;
    if (this.props.productId) {
      filteredReviews = reviews.filter(
        review => review.productId === this.props.productId
      );
    } else {
      filteredReviews = reviews.filter(
        review => review.userId === this.props.user.id
      );
    }
    return (
      <div>
        <footer>
          <div>
            {filteredReviews.map(review => (
              <div className="reviewDiv" key={review.id}>
                <h4>{review.title}</h4>
                <h5>{review.body}</h5>
                {this.props.user ? (
                  <button
                    type="submit"
                    onClick={() => this.props.deleteReview(review)}
                  >
                    Delete Review
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reviews: state.reviews
});

const mapDispatchToProps = dispatch => {
  return {
    listReviews: () => dispatch(listReviews()),
    deleteReview: review => dispatch(deleteReview(review))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews);
