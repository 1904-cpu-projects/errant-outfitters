import React from 'react';

// numberItems needs to just be a number
// pull in from redux store CartStore I think
export function CartHeader({ cart }) {
  const cartItems = cart ? cart.length : 0;
  return <div>Cart | {cartItems}</div>;
}
