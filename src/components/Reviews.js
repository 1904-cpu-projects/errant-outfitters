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
    const filteredReviews = reviews.filter(
      item => item.productId === this.props.productId
    );
    //reviews need to be filtered based on the product id
    console.log("REVIEWS", this.props);
    console.log("FILTERED reviews", filteredReviews);
    return (
      <div>
        <footer>
          <h4>Reviews for the {this.props.product.name}</h4>
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
