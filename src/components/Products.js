import React from 'react';
import { connect } from 'react-redux';
import { SingleProduct } from './SingleProduct';

export function Products({ products }) {
  return (
    <div className="products-list">
      {products.productList.map(p => {
        return <SingleProduct key={p.id} product={p} />;
      })}
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps)(Products);
