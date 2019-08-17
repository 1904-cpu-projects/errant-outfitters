import React from 'react';
import { Link } from 'react-router-dom';

// numberItems needs to just be a number
// pull in from redux store CartStore I think
export function CartHeader({ cart }) {
  const cartItems = cart ? cart.length : 0;
  return (
      <Link to="/myCart">
        <button id='cart-button'>Cart:{cartItems}</button>
      </Link>
  );
}
