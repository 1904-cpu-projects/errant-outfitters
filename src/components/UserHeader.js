import React from 'react';

import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../storeReducers/userReducer';
import { getCart } from '../storeReducers/cartReducer';

async function handleLogin(ev, loginUser, getCart) {
  ev.preventDefault();
  const email = ev.target[0].value;
  const password = ev.target[1].value;
  await loginUser(email, password);
  getCart(true);
  window.location.hash = '/';
}

// This also has the same thing happening
async function handleLogout(ev, logoutUser, getCart) {
  ev.preventDefault();
  await logoutUser();
  getCart();
}

function UserHeader({ user, loginUser, logoutUser, getCart }) {
  if (user.id === undefined) {
    return (
      <div id="login-box">
        {' '}
        Hello, Guest{' '}
        <a href="/#/CreateUserForm">
          <button>Register</button>
        </a>
        <form onSubmit={e => handleLogin(e, loginUser, getCart)}>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" required />
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" required />
          <button>Login</button>
        </form>
        <form method="get" action="/auth/google">
          <button type="submit" className="btn bg-red white p1 rounded">
            Login with Google
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div id="login-box">
        {' '}
        Hello, {user.firstName} {user.lastName} <br />
        Class: {user.class.charAt(0).toUpperCase() + user.class.slice(1)}
        <br />
        {user.isAdmin ? 'You are logged in as an ADMIN' : ''}
        {user ? <a href="#/user/profile">Profile</a> : ''}
        <br />
        <br />
        <form onSubmit={e => handleLogout(e, logoutUser, getCart)}>
          <button>Logout</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart.items,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  logoutUser: () => dispatch(logoutUser()),
  getCart: userLogin => dispatch(getCart(userLogin)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserHeader);
