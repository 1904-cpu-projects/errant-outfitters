import React from 'react';
import { connect } from 'react-redux';
import { SingleProduct } from './SingleProduct';
import ClassProducts from './ClassProducts';

export function Products({ products, match }) {
  if (match.params.filterBar === 'ClassProducts') return <ClassProducts />;

  const displayFilter = match.params.filterBar
    ? products.productList.filter(
        p => p.catagory === match.params.filterBar.toLowerCase(),
      )
    : products.productList;

  //function to make tiles from SingleProduct component
  return (
    <div className="products-list">
      {displayFilter.map(p => {
        return <SingleProduct key={p.id} product={p} />;
      })}
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps)(Products);
