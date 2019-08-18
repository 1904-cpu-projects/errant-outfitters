import React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class StripeCard extends React.Component {
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
  }

  render() {
    return (
      <div>
        <CardElement />        
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(StripeCard);
