import React from "react";
import { listReviews, deleteReview } from "../actions/reviewActions";
import { connect } from "react-redux";

let filteredReviews;

//for this reviews page, we need to properly associate the Product with the reviews
class Reviews extends React.Component {
  componentDidMount() {
    this.props.listReviews();
  }

  render() {
    const { reviews } = this.props.reviews;
    if (this.props.productId) {
      filteredReviews = reviews.filter(
        review => review.productId === this.props.productId
      );

      //solmethig wrong with the filtration - not matching up properly.
    } else if (this.props.user) {
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
                  <button onClick={() => this.props.deleteReview(review)}>
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
