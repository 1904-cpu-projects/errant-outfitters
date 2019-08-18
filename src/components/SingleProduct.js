import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SingleProduct({ product }) {
  let stocked = 'No';
  if (product.inStock) {
    stocked = 'Yes';
  }
  return (
    <div key={product.id} className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          className="product-image"
          src={
            product.image ? product.image : '/img/products/default-product.jpg'
          }
          alt="Product Image"
        />
      </Link>
      <div key={product.id} className="product-container">
        <h3>
          <b> {product.name} </b>
        </h3>
        <p>
          {product.description ? product.description.slice(0, 50) + '...' : ''}
        </p>
        <p>Cost: {product.cost}</p>
        <p>In Stock: {stocked}</p> <p>Count: {product.stock}</p>
      </div>
      <Link to={`/products/${product.id}`}>
        <button>Details</button>
      </Link>
    </div>
  );
}

SingleProduct.defaultProps = {
  image: '',
  product: {},
  description: '',
  name: '',
};

SingleProduct.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  product: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
};

export default SingleProduct;
