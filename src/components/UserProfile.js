import React from 'react';
import { connect } from 'react-redux';

import UserCart from './UserCart';
import Reviews from './Reviews';

class UserProfile extends React.Component {
  render() {
    const { user, cart } = this.props;
    return (
      <div>
        <div>
          {user.isAdmin ? <a href="/users/admin">Edit Current Users</a> : ''}
        </div>
        <h3>
          User profile for {user.firstName} {user.lastName}
        </h3>
        <div>
          First Name: {user.firstName}
          Last Name: {user.lastName}
          email:
        </div>
        <UserCart cart={cart} />
        <div>
          <h1>Authored Reviews</h1>
          <Reviews user={user} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  reviews: state.reviews,
  cart: state.cart,
});

export default connect(
  mapStateToProps,
  null,
)(UserProfile);
