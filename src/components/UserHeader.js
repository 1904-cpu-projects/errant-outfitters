import React from 'react';
import axios from 'axios';

import UserProfile from './UserProfile';

import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../storeReducers/userReducer';
import { getCart } from '../storeReducers/cartReducer';

// This needs to be async based on the fact that getCart()
// relies on loginUser() having completed?
async function handleLogin(ev, loginUser) {
  ev.preventDefault();
  const email = ev.target[0].value;
  const password = ev.target[1].value;
  await loginUser(email, password);
  this.props.getCart();
}

// This also has the same thing happening
async function handleLogout(ev, logoutUser) {
  ev.preventDefault();
  await logoutUser();
  this.props.getCart();
}

function UserHeader({ user, loginUser, logoutUser }) {
  if (user.id === undefined) {
    return (
      <div>
        {' '}
        Hello, Guest{' '}
        <a href="/#/CreateUserForm">
          <button>Register</button>
        </a>
        <form onSubmit={e => handleLogin(e, loginUser)}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            placeholder="test@test.test"
            required
          />
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" required />
          <button>Login</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        {' '}
        Hello, {user.firstName} {user.lastName}{' '}
        {user ? <a href="#/user/profile">PROFILE</a> : ''}
        <form onSubmit={e => handleLogout(e, logoutUser)}>
          <button>Logout</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  logoutUser: () => dispatch(logoutUser()),
  getCart: () => dispatch(getCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserHeader);
