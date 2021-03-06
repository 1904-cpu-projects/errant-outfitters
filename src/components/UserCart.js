import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateUserItemFromGuest,
  deleteCartItem,
} from '../storeReducers/cartReducer';

class UserCart extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
    this.calcTotal = this.calcTotal.bind(this);
  }

  componentDidMount() {
    this.calcTotal();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.cart.length !== prevProps.cart.length ||
      (this.props.cart.length > 1 && this.state.total === 0)
    ) {
      this.calcTotal();
    }
  }

  calcTotal() {
    const { cart } = this.props;
    const total = cart.reduce((acc, item) => {
      return acc + item.product.cost * item.quantity;
    }, 0);
    this.setState({ total: total });
  }

  render() {
    const {
      cart,
      guestCart,
      user,
      updateUserItemFromGuest,
      deleteCartItem,
    } = this.props;
    if (cart.length || guestCart) {
      return (
        <div className="user-cart">
          <div className="cart-list">
            <h3>Hey {user.firstName}! Here is all your junk...</h3>
            <ul>
              {guestCart.length
                ? guestCart.map(i => (
                    <li key={i.id}>
                      <img src={i.product.image} />
                      <h2>
                        This item is from the guest cart: Pick an action or lose
                        it
                      </h2>
                      <button onClick={() => updateUserItemFromGuest(i)}>
                        Move to my cart
                      </button>
                      <button onClick={() => deleteCartItem(i.id)}>
                        Remove From Existance
                      </button>
                      {i.product.name} | quantity {i.quantity} | In Stock :{' '}
                      {i.product.inStock ? 'YES' : 'NO'}
                    </li>
                  ))
                : null}
            </ul>
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
              Total: {this.state.total} gold coins<br/><br/>
              ~Credit card also accepted~
            </h3>
            <Link to="/checkout">
              <button>Proceed to Checkout</button>
            </Link>
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

UserCart.propTypes = {
  user: PropTypes.object,
  cart: PropTypes.array,
  guestCart: PropTypes.array,
  updateUserItemFromGuest: PropTypes.func,
  deleteCartItem: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart.items,
  guestCart: state.cart.guest,
});

const mapDispatchToProps = dispatch => ({
  deleteCartItem: id => dispatch(deleteCartItem(id)),
  updateUserItemFromGuest: item => dispatch(updateUserItemFromGuest(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserCart);
