/* eslint-disable react/prop-types */
import React from 'react';

import { Link } from 'react-router-dom';

export function CartHeader({ cart }) {
  const cartItems = cart ? cart.length : 0;
  return (
    <div className='cart-header'>
      <Link to='/myCart'>
        <img id='cart-icon' src='/img/cart.png'></img>
        <h4 id="cart-button">Cart:{cartItems}</h4>
      </Link>
    </div>
  );
}
