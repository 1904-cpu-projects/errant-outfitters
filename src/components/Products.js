import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SingleProduct from './SingleProduct';
import ClassProducts from './ClassProducts';

export function Products({ products, match }) {
  let displayFilter = [];
  if (match.params.filterBar === 'ClassProducts') return <ClassProducts />;
  match.params.filterBar === 'inStock'
    ? (displayFilter = products.productList.filter(p => p.inStock))
    : match.params.filterBar === 'outStock'
    ? (displayFilter = products.productList.filter(p => !p.inStock))
    : match.params.filterBar === 'warrior'
    ? (displayFilter = products.productList.filter(p => p.class === 'warrior'))
    : match.params.filterBar === 'mage'
    ? (displayFilter = products.productList.filter(p => p.class === 'mage'))
    : match.params.filterBar === 'rouge'
    ? (displayFilter = products.productList.filter(p => p.class === 'rouge'))
    : match.params.filterBar === 'costA'
    ? (displayFilter = products.productList
        .filter(p => p.cost)
        .sort((a, b) => (a.cost > b.cost ? 1 : -1)))
    : match.params.filterBar === 'costD'
    ? (displayFilter = products.productList
        .filter(p => p.cost)
        .sort((a, b) => (a.cost < b.cost ? 1 : -1)))
    : match.params.filterBar === 'stockD'
    ? (displayFilter = products.productList
        .filter(p => p.stock)
        .sort((a, b) => (a.stock < b.stock ? 1 : -1)))
    : match.params.filterBar === 'stockA'
    ? (displayFilter = products.productList
        .filter(p => p.stock)
        .sort((a, b) => (a.stock > b.stock ? 1 : -1)))
    : match.params.filterBar === 'pnameA'
    ? (displayFilter = products.productList
        .filter(p => p.name)
        .sort((a, b) => (a.name > b.name ? 1 : -1)))
    : match.params.filterBar === 'pnameD'
    ? (displayFilter = products.productList
        .filter(p => p.name)
        .sort((a, b) => (a.name < b.name ? 1 : -1)))
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

Products.defaultProps = {
  productList: [],
  products: [],
  match: {},
};

Products.propTypes = {
  products: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  productList: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
};

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps)(Products);
