import React from 'react';
import { connect } from 'react-redux';

import { CartHeader } from './CartHeader';
import UserHeader from './UserHeader';

function Header({ user, cart }) {
  return (
    <div className="header">
      <a href="/">
        <img src="/img/eoLogo.jpeg" />
      </a>
      <h1>Errant Outfitters Adventure Shop</h1>
      <CartHeader cart={cart} />
      <UserHeader />
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
});

export default connect(mapStateToProps)(Header);
