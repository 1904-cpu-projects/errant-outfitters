import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { connect } from 'react-redux';
import axios from 'axios';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    console.log('this happened');
    let {token} = await this.props.stripe.createToken({name: "Name"});
    console.log(token);
    try {
      const { data } = await axios.post('/api/checkout', token);
      console.log(data);
    }
    catch(e) {
      console.log(e);
    }
    // Add our server call here
  }

  render() {
    console.log(this.props);
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(Transactions);
