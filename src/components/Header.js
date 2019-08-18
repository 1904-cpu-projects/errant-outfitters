import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CartHeader } from './CartHeader';
import UserHeader from './UserHeader';

function Header({ cart }) {
  return (
    <div className="header">
      <Link to="/">
        <img src="/img/eoLogo.jpeg" />
      </Link>
      <h1 id="title-menu">Errant Outfitters Adventure Shop</h1>
      <CartHeader cart={cart} />
      <UserHeader />
    </div>
  );
}

Header.propTypes = {
  cart: PropTypes.array,
};

const mapStateToProps = state => ({
  cart: state.cart.items,
});

export default connect(mapStateToProps)(Header);
