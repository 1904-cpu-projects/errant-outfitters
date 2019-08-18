import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UserCart from './UserCart';
import Reviews from './Reviews';
// This needs to be implemented
//import Transactions from './Transactions';

class UserProfile extends React.Component {
  render() {
    const { user, cart } = this.props;
    return (
      <div>
        <h3>
          User profile for {user.firstName} {user.lastName}
        </h3>
        <div>
          First Name: {user.firstName}
          Last Name: {user.lastName}
          email:{user.email}
        </div>
        <Link to="/edit-user">Edit Profile Info</Link>
        <div>
          {user.isAdmin ? <a href="/edit-user">Edit Current Users</a> : ''}
        </div>
        <div>
          {user.isAdmin ? <Link to="/create-product">Create Product</Link> : ''}
        </div>
        <UserCart cart={cart} />
        <div>
          <h1>Authored Reviews</h1>
          <Reviews user={user} />
        </div>
        <div>
          <h2>Your past Transactions</h2>
          {/* Yet to be implemented<Transactions />*/}
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object,
  cart: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.user,
  reviews: state.reviews,
  cart: state.cart,
});

export default connect(
  mapStateToProps,
  null,
)(UserProfile);
