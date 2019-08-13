import React from 'react';
import Reviews from './Reviews';
import { connect } from 'react-redux';
import { getDetailProduct } from '../storeReducers/productsReducer';
import { createItem } from '../storeReducers/cartReducer';
import CreateReview from '../components/CreateReview';
import { Link } from 'react-router-dom';
import { deleteProductThunk } from '../actions/productActions';

function handleBuy(matchId) {
  createItem(matchId);
}

function DetailProduct({ detailProduct, matchId, user, deleteProduct }) {
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
        <button onClick={e => handleBuy(matchId)}>Buy this stuff!</button>
        <h1>{detailProduct.name}</h1>
        <div>{detailProduct.description}</div>
        <div>INSTOCK | {detailProduct.instock ? 'YES' : 'NO'}</div>
        <footer>
          <h4>Reviews for the {detailProduct.name}</h4>
          <Reviews product={detailProduct} productId={matchId} />
        </footer>
        <h4>Like this product? Consider logging in and writing a review</h4>
        {user.id ? <CreateReview product={detailProduct} /> : ''}
        <div>
          {user.isAdmin ? (
            <Link to={`/products/${detailProduct.id}/edit`}>
              Edit Product Info
            </Link>
          ) : (
            ''
          )}
        </div>
        <div>
          {user.isAdmin ? (
            <button onClick={() => deleteProduct(detailProduct)}>
              Delete Product
            </button>
          ) : (
            ''
          )}
        </div>
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

const mapStateToDispatch = dispatch => {
  return {
    deleteProduct: item => dispatch(deleteProductThunk(item)),
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(DetailProduct);
