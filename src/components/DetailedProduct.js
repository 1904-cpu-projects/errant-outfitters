import React from 'react';
import { connect } from 'react-redux';
import { getDetailProduct } from '../storeReducers/productsReducer';
import { createItem } from '../storeReducers/cartReducer';
import CreateReview from '../components/CreateReview';

import Reviews from './Reviews';
import MenuBar from './MenuBar';

function handleBuy(createItem, matchId, quantity) {
  if (quantity) createItem(matchId, quantity);
}

function initQuantity() {
  let result = 0;
  return function(update = false, value) {
    if (update) result = value;
    return result;
  };
}

function populateQuantityOptions(max) {
  const options = [];
  for (let i = 0; i <= max && i <= 10; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>,
    );
  }
  return options;
}

// More to come for this thing, need reviews, and add to cart
// Basics are here!!!
function DetailProduct({ detailProduct, matchId, user, createItem }) {
  const updatedQuantity = initQuantity();
  if (detailProduct.id !== matchId) getDetailProduct(matchId);
  if (!detailProduct) return null;
  else {
    return (
      <div>
        <MenuBar />
        <img
          src={detailProduct.image}
          className={'product-image'}
          alt="Product Image"
        />
        <button
          onClick={() => handleBuy(createItem, matchId, updatedQuantity())}
        >
          Buy this stuff!
        </button>
        <select onChange={e => updatedQuantity(true, e.target.value)}>
          {populateQuantityOptions(detailProduct.stock)}
        </select>

        <h1>{detailProduct.name}</h1>
        <div>{detailProduct.description}</div>
        <div>
          INSTOCK | {detailProduct.instock ? 'YES' : 'NO'} | Available:{' '}
          {detailProduct.stock}
        </div>
        <footer>
          <h4>Reviews for the {detailProduct.name}</h4>
          <Reviews product={detailProduct} productId={matchId} />
        </footer>
        <h4>Like this product? Consider logging in and writing a review</h4>
        {user.id ? <CreateReview product={detailProduct} /> : ''}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    detailProduct: state.products.detailProduct,
    matchId: ownProps.match.params.id,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => ({
  createItem: (productId, quantity) =>
    dispatch(createItem(productId, quantity)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailProduct);
