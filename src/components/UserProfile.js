import React from "react";
import { connect } from "react-redux";
import Reviews from "./Reviews";

class UserProfile extends React.Component {
  render() {
    const { user, reviews } = this.props;
    console.log("USER PROFILE", reviews);
    return (
      <div>
        <h3>
          User profile for {user.firstName} {user.lastName}
        </h3>
        <div>
          First Name: {user.firstName}
          Last Name: {user.lastName}
          email:
        </div>
        <div>
          <h1>Authored Reviews</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  reviews: state.reviews
});

export default connect(
  mapStateToProps,
  null
)(UserProfile);
