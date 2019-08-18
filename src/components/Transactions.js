import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class Transactions extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      loadingSuccess: null,
      errorMessage: '',
    };
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/transactions');
      const transactions = [];
      const existsTest = {};
      while (data.length) {
        // Have fun figuring out what the heck I'm doing here :)
        // I regret nothing!?!
        // Love: NICK
        const testAgainst = data.pop();
        if (existsTest[testAgainst.createdAt] === undefined) {
          existsTest[testAgainst.createdAt] = transactions.length;
          transactions.push({
            total: testAgainst.totalCost,
            products: [
              {
                name: testAgainst.product.name,
                quantity: testAgainst.quantity,
              },
            ],
          });
        } else {
          transactions[existsTest[testAgainst.createdAt]].total +=
            testAgainst.totalCost;
          transactions[existsTest[testAgainst.createdAt]].products.push({
            name: testAgainst.product.name,
            quantity: testAgainst.quantity,
          });
        }
      }
      this.setState({ transactions: transactions, loadingSuccess: true });
    } catch (e) {
      this.setState({ loadingSuccess: false, errorMessage: e });
    }
  }

  render() {
    const { transactions } = this.state;
    if (this.state.loadingSuccess === null) {
      return (
        <div>
          <p>
            You have no transactions.
            <br />
            If you feel this is not right feel free to telepathically contact us
            and we will do our best to rectify the problem
          </p>
        </div>
      );
    }
    return (
      <div>
        {transactions.map((item, idx) => (
          <SingleTransaction key={idx} item={item} />
        ))}
        <p>There will be transactions here!</p>
      </div>
    );
  }
}

SingleTransaction.propTypes = {
  item: PropTypes.object,
  total: PropTypes.number,
  products: PropTypes.array,
  map: PropTypes.func,
};

function SingleTransaction({ item }) {
  return (
    <div>
      Total Cost = {item.total}
      {item.products.map((p, idx) => (
        <p key={idx}>
          Product Name: {p.name} | Amount Purchased: {p.quantity}
        </p>
      ))}
    </div>
  );
}
