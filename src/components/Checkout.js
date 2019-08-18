import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import { connect } from 'react-redux';


import StripCard from './StripeCard';

class Transactions extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0
    };
  }

  calcTotal(cart) {
    const total = cart.items.reduce((acc, item) => {
      return acc + item.product.cost * item.quantity;
    }, 0);
    console.log(total);
    this.setState({ total: total });
  }

  componentDidMount() {
    const { cart } = this.props;
    const total = this.calcTotal(cart);
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <div>
          <StripeProvider apiKey="pk_test_BUXU0xV4Pn0VSZn5JkeJcDUT005a8CjBCy">
            <Elements>
              <StripCard />
            </Elements>
          </StripeProvider>
        </div>
        <div>
          <h2>Your total for this purchase is ${this.state.total}</h2>
          <p>You don't even need to worry about shipping information<br/>
            We have mages on standby to teleport your items directly to you!
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps, null)(Transactions);
