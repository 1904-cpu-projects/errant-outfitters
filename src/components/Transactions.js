import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';
import axios from 'axios';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    console.log('this happened');
    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    console.log(token);
    try {
      const { data } = await axios.post('/api/checkout', token);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    // Add our server call here
  }

  calcTotal(cart) {
    const total = cart.reduce((acc, item) => {
      return acc + item.product.cost * item.quantity;
    }, 0);
    this.setState({ total: total });
  }

  render() {
    const { cart } = this.props;
    const total = this.calcTotal(cart);
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <div>
          <CardElement />
          <button onClick={this.handleSubmit}>Send</button>
        </div>
        <div>
          <h2>Your total for this purchase is ${total}</h2>
          <p>
            You don't even need to worry about shipping information
            <br />
            We have mages on standby to teleport your items directly to you!
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
});

connect(
  mapStateToProps,
  null,
)(Transactions);

export default injectStripe(Transactions);
