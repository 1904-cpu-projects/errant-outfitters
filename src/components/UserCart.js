import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

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

  getProductInfo() {
    const { cart, user } = this.props;
    axios
      .get('/api/cart/getCartProducts')
      .then(({ data }) => {
        this.setState({ items: data });
      })
      .catch(e => console.log(e));
  }

  componentDidMount() {
    this.getProductInfo();
  }

  render() {
    const { cart, user } = this.props;
    const { items } = this.state;
    if (items.length) {
      return (
        <div className="user-cart">
          <div className="cart-list">
            <h3>Here is all your junk...</h3>
            <ul>
              {items.map(i => (
                <li key={i.id}>
                  <img src={i.image} />
                  {i.name} | quantity {i.quantity} | In Stock :{' '}
                  {i.inStock ? 'YES' : 'NO'}
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
