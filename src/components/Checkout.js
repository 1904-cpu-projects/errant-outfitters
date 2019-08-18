import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { connect } from 'react-redux';

import StripCard from './StripeCard';
import { getCart } from '../storeReducers/cartReducer';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      transactionComplete: false,
      transacitons: [],
    };
    this.updateCart = this.updateCart.bind(this);
  }

  calcTotal(cart) {
    const total = cart.items.reduce((acc, item) => {
      return acc + item.product.cost * item.quantity;
    }, 0);
    this.setState({ total: total });
  }

  updateCart(data) {
    console.log(data);
    this.props.getCart();
    this.setState({ transactionComplete: true, transactions: [...data] });
  }

  componentDidMount() {
    const { cart } = this.props;
    const total = this.calcTotal(cart);
  }

  render() {
    if (!this.state.transactionComplete) {
      return (
        <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <div>
            <StripeProvider apiKey="pk_test_BUXU0xV4Pn0VSZn5JkeJcDUT005a8CjBCy">
              <Elements>
                <StripCard updateCart={this.updateCart} />
              </Elements>
            </StripeProvider>
          </div>
          <div>
            <h2>Your total for this purchase is ${this.state.total}</h2>
            <p>
              You don't even need to worry about shipping information
              <br />
              We have mages on standby to teleport your items directly to you!
            </p>
          </div>
        </div>
      );
    } else {
      return <div>Your transaction is complete!</div>;
    }
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);
