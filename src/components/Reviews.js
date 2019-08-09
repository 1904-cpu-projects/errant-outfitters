import React from "react";
import { listReviews } from "../actions/reviewActions";
import { connect } from "react-redux";

//for this reviews page, we need to properly associate the Product with the reviews
class Reviews extends React.Component {
  componentDidMount() {
    this.props.listReviews();
  }
  render() {
    const { reviews } = this.props.reviews;

    console.log("REVIEWS", this.props.user);

    let filteredReviews;
    if (this.props.productId) {
      filteredReviews = reviews.filter(
        review => review.productId === this.props.productId
      );
    } else if (this.props.user) {
      filteredReviews = reviews.filter(
        review => review.userId === this.props.user.id
      );
    }
    console.log("FILTERED REVIEWS", filteredReviews);
    //reviews need to be filtered based on the product id
    // if (!reviews || !this.props.user) return null;
    return (
      <div>
        <footer>
          <div>
            {filteredReviews.map(i => (
              <div className="reviewDiv" key={i.id}>
                <h4>{i.title}</h4>
                <h5>{i.body}</h5>
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
    listReviews: () => dispatch(listReviews())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews);
