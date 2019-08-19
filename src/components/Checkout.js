import React from 'react';
import PropTypes from 'prop-types';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { connect } from 'react-redux';

import StripCard from './StripeCard';
import { getCart } from '../storeReducers/cartReducer';
import { listProductsThunk } from '../actions/productActions';

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
    this.props.listProductsThunk();
    this.setState({ transactionComplete: true, transactions: [...data] });
  }

  componentDidMount() {
    const { cart } = this.props;
    this.calcTotal(cart);
  }

  render() {
    if (!this.state.transactionComplete) {
      return (
        <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <div>
            <StripeProvider apiKey={process.env.STRIPE_API}>
              <Elements>
                <StripCard updateCart={this.updateCart} />
              </Elements>
            </StripeProvider>
          </div>
          <div>
            <h2>Your total for this purchase is ${this.state.total}</h2>
            <p>
              You don&apos;t even need to worry about shipping information
              <br />
              We have mages on standby to teleport your items directly to you!
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Your transaction is complete!</h2>
          <div>
            Total cost: {this.state.transactions[0].totalCost}
            <br />
            Transaction #: {this.state.transactions[0].id}
            <br />
            Your Items:
            <br />
            {this.state.transactions.map((item, idx) => (
              <p key={idx}>
                {item.product.name} | Quantity: {item.quantity}
              </p>
            ))}
          </div>
        </div>
      );
    }
  }
}

Checkout.propTypes = {
  cart: PropTypes.object,
  getCart: PropTypes.func,
  listProductsThunk: PropTypes.func,
};

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  listProductsThunk: () => dispatch(listProductsThunk()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);
