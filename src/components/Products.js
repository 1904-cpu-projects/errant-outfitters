import React from 'react';
import { connect } from 'react-redux';
import { SingleProduct } from './SingleProduct';
import ClassProducts from './ClassProducts';
import PropTypes from 'prop-types';

export function Products({ products, match }) {
  let displayFilter = [];
  if (match.params.filterBar === 'ClassProducts') return <ClassProducts />;
  match.params.filterBar === 'inStock'
    ? (displayFilter = products.productList.filter(p => p.inStock))
    : match.params.filterBar === 'outStock'
    ? (displayFilter = products.productList.filter(p => !p.inStock))
    : (displayFilter = match.params.filterBar
        ? products.productList.filter(
            p => p.catagory === match.params.filterBar,
          )
        : products.productList);

  //function to make tiles from SingleProduct component
  return (
    <div className="products-list">
      {displayFilter.map(p => {
        return <SingleProduct key={p.id} product={p} />;
      })}
    </div>
  );
}

Products.propTypes = {
  productList: PropTypes.array,
};

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps)(Products);
