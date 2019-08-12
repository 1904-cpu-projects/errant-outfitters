import React from 'react';
import { connect } from 'react-redux';
import { getDetailProduct } from '../storeReducers/productsReducer';
import { createItem } from '../storeReducers/cartReducer';
import CreateReview from '../components/CreateReview';

import Reviews from './Reviews';

function handleBuy(createItem, matchId) {
  createItem(matchId);
}

// More to come for this thing, need reviews, and add to cart
// Basics are here!!!
function DetailProduct({ detailProduct, matchId, user, createItem }) {
  if (detailProduct.id !== matchId) getDetailProduct(matchId);
  if (!detailProduct) return null;
  else {
    return (
      <div>
        <img
          src={detailProduct.image}
          className={'product-image'}
          alt="Product Image"
        />
        <button onClick={() => handleBuy(createItem, matchId)}>Buy this stuff!</button>
        <h1>{detailProduct.name}</h1>
        <div>{detailProduct.description}</div>
        <div>INSTOCK | {detailProduct.instock ? 'YES' : 'NO'}</div>
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
  createItem: (productId, quantity) => dispatch(createItem(productId, quantity)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(DetailProduct);
