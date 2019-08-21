import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Reviews from './Reviews';
import CreateReview from '../components/CreateReview';

import { connect } from 'react-redux';
import {
  deleteProductThunk,
  singleProductThunk,
} from '../actions/productActions';
import { createItem } from '../storeReducers/cartReducer';

function handleBuy(createItem, matchId, quantity) {
  if (quantity) createItem(matchId, quantity);
}

function initQuantity() {
  let result = 1;
  return function(update = false, value) {
    if (update) result = value;
    return result;
  };
}

function populateQuantityOptions(max) {
  const options = [];
  for (let i = 1; i <= max && i <= 10; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>,
    );
  }
  return options;
}

class DetailProduct extends React.Component {
  componentDidMount() {
    this.props.singleProductThunk(this.props.matchId);
  }

  render() {
    const {
      detailProduct,
      matchId,
      user,
      createItem,
      deleteProduct,
    } = this.props;

    const updatedQuantity = initQuantity();

    if (!detailProduct) return null;
    else {
      return (
        <div className='detailedProducts'>
          <div id='productTile'>
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
          </div>
          <div id='productDetails'>
            <h1>{detailProduct.name}</h1>
            <div>{detailProduct.description}</div>
            <br/>
            <div>
              Available:{' '}
              {detailProduct.stock}
            </div>
            </div>
          <div id='reviewProduct'>
            <footer>
              <h4>Reviews for the {detailProduct.name}</h4>
              <div id='singleReview'>
                <Reviews product={detailProduct}  productId={matchId} />
              </div>
            </footer>
            <h4>Like this product? Consider logging in and writing a review</h4>
            {user.id ? <CreateReview product={detailProduct} /> : ''}
          </div>
          <div className='admin-tools'>
            <div>
              {user.isAdmin ? (
                <div>
                  <h3>Admin Tools</h3>
                  <Link to={`/products/${detailProduct.id}/edit`}>
                    Edit Product Info
                  </Link>
                </div>
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
        </div>
      );
    }
  }
}

DetailProduct.propTypes = {
  singleProductThunk: PropTypes.func,
  createItem: PropTypes.func,
  deleteProduct: PropTypes.func,
  detailProduct: PropTypes.object,
  matchId: PropTypes.string,
  user: PropTypes.object,
};

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
  deleteProduct: item => dispatch(deleteProductThunk(item)),
  singleProductThunk: id => dispatch(singleProductThunk(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailProduct);
