import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { deleteCartItem } from '../storeReducers/cartReducer';

// The only information that lives here is the cart item information
// Everything else for the Cart proper exists in the redux store
// Api calls to cart to change cart information also live in the redux store
// This api calls are called directly. I'm still really stupid and have no
// clue what redux-thunks actually provide me to my benefit.
class UserCart extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
    this.getProductInfo = this.getProductInfo.bind(this);
  }

  // This component has the cart items and product items mixed into
  // the same array, sorry if this is hard to reason about.
  getProductInfo() {
    const { cart } = this.props;
    axios
      .get('/api/cart/getCartProducts')
      .then(({ data }) => {
        data.forEach((elem) => {
          elem.productId = elem.id;
          elem.id = cart.reduce((acc, c) => {
            if(acc) return acc;
            if(elem.productId === c.productId) return c.id;
            else return undefined;
          }, undefined);
        });
        this.setState({ items: data });
      })
      .catch(e => console.log(e));
  }

  componentDidMount() {
    this.getProductInfo();
  }

  componentDidUpdate(prevProps) {
    const { cart, user } = this.props;
    if(user.id !== prevProps.user.id || cart.length !== prevProps.cart.length) {
      this.getProductInfo();
    }
  }

  render() {
    const { cart, user } = this.props;
    const { items } = this.state;
    if (items.length) {
      return (
        <div className="user-cart">
          <div className="cart-list">
            <h3>Hey { user.firstName }! Here is all your junk...</h3>
            <ul>
              {items.map(i => (
                <li key={i.id}>
                  <img src={i.image} />
                  {i.name} | quantity {i.quantity} | In Stock :{' '}
                  {i.inStock ? 'YES' : 'NO'}
                  <button onClick={() => deleteCartItem(i.id)}>Remove from cart</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="cart-checkout">
            <h3>Subtotal ({items.length}): total???</h3>
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
