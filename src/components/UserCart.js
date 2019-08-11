import React from 'react';
import { connect } from 'react-redux';

function generateCartList() {}

function UserCart({ user, cart }) {
  if (cart.length) {
    return (
      <div className="user-cart">
        <div className="cart-list">
          <h3>Here is all your junk...</h3>
          <ul>
            {cart.map(i => (
              <li key={i.id}>
                {i.productId} | quantity {i.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="cart-checkout">
          <h3>Subtotal ({cart.length}): total???</h3>
          <button>Proceed to checkout</button>
        </div>
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
  user: state.user,
  cart: state.cart,
});

export default connect(mapStateToProps)(UserCart);
