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
    console.log("PROPS", this.props);
    if (this.props.productId) {
      console.log("product route");
      filteredReviews = reviews.filter(
        review => review.productId === this.props.productId
      );

      //solmethig wrong with the filtration
    } else if (this.props.user) {
      console.log("user route");
      filteredReviews = reviews.filter(
        review => review.userId === this.props.user.id
      );
    }
    console.log("REVEW PROPS", this.props.reviews);
    console.log("filtered", filteredReviews);

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
    deleteReview: id => dispatch(deleteReview(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews);
