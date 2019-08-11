import React from 'react';
import { connect } from 'react-redux';

function generateCartList() {}

function UserCart({ cart }) {
  if (cart.length) {
    return (
      <div>
        <h3>Here is all your junk...</h3>
        <ul>
          {cart.map(i => (
            <li key={i.id}>{i.productId}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Your cart is empty</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(UserCart);
