import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { deleteCartItem } from '../storeReducers/cartReducer';

class UserCart extends React.Component {
  constructor() {
    super();

    this.state = {
      total: 0,
    };
    this.calcTotal = this.calcTotal.bind(this);
  }

  calcTotal() {
    const { cart } = this.props;
    const total = cart.reduce((acc, item) => {
      return acc + item.product.cost * item.quantity;
    }, 0);
    this.setState({ total: total });
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart.length !== prevProps.cart.length) {
      this.calcTotal();
    }
  }

  componentDidMount() {
    this.calcTotal();
  }

  render() {
    const { cart, user } = this.props;
    if (cart.length) {
      return (
        <div className="user-cart">
          <div className="cart-list">
            <h3>Hey {user.firstName}! Here is all your junk...</h3>
            <ul>
              {cart.map(i => (
                <li key={i.id}>
                  <img src={i.product.image} />
                  {i.product.name} | quantity {i.quantity} | In Stock :{' '}
                  {i.product.inStock ? 'YES' : 'NO'}
                  <button onClick={() => deleteCartItem(i.id)}>
                    Remove from cart
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="cart-checkout">
            <h3>
              Subtotal ({cart.length})<br />
              total: {this.state.total} GOLDS!!!!
            </h3>
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
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
});

export default connect(mapStateToProps)(UserCart);
