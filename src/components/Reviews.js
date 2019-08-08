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
    return (
      <div>
        <footer>
          <h4>Reviews for the {this.props.product.name}</h4>
          <div>
            {reviews.map(i => (
              <div key={i.id}>
                {i.title}
                {i.body}
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
