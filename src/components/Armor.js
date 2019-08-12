import React from 'react';
import { connect } from 'react-redux';
import { SingleProduct } from './SingleProduct';
import MenuBar from './MenuBar';

export function Products({ products }) {
  const armor = products.productList.filter(a => a.catagory === 'armor');
  //function to make tiles from SingleProduct component
  const tileProducts = armor.map(p => {
    return <SingleProduct key={p.id} product={p} />;
  });
  return (
    <div>
      <MenuBar />
      <div className="products-list">{tileProducts}</div>
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps)(Products);
