/* eslint-disable react/prop-types */
import React from 'react';

import { Link } from 'react-router-dom';

export function CartHeader({ cart }) {
  const cartItems = cart ? cart.length : 0;
  return (
    <Link to="/myCart">
      <button id="cart-button">Cart:{cartItems}</button>
    </Link>
  );
}
