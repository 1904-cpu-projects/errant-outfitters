import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { CartHeader } from './CartHeader';
import UserHeader from './UserHeader';

function Header({ user, cart }) {
  return (
    <div className="header">
      <Link to="/">
        <img src="/img/eoLogo.jpeg" />
      </Link>
      <h1>Errant Outfitters Adventure Shop</h1>
      <CartHeader cart={cart} />
      <UserHeader />
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart.items,
});

export default connect(mapStateToProps)(Header);
