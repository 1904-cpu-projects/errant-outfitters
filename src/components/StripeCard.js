import React from 'react';
import PropTypes from 'prop-types';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

class StripeCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    try {
      const { data } = await axios.post('/api/checkout', token);
      this.props.updateCart(data);
    } catch (e) {
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

StripeCard.propTypes = {
  stripe: PropTypes.object,
  createToken: PropTypes.func,
  updateCart: PropTypes.func,
};

export default injectStripe(StripeCard);
