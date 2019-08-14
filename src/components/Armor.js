import React from 'react';
import { connect } from 'react-redux';
import { SingleProduct } from './SingleProduct';
import MenuBar from './MenuBar';

export function Products({ products }) {
  const armor = products.productList.filter(a => a.catagory === 'armor');
  //function to make tiles from SingleProduct component

  return (
    <div>
      <MenuBar />
      <div className="products-list">
        {armor.map(p => {
          return <SingleProduct key={p.id} product={p} />;
        })}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps)(Products);
