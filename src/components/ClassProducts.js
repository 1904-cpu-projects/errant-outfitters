import React from 'react';
import { connect } from 'react-redux';
import { SingleProduct } from './SingleProduct';
import MenuBar from './MenuBar';

export function Products({ products, user }) {
  const classProducts = products.productList.filter(
    a => a.class === user.class,
  );
  //function to make tiles from SingleProduct component
  if (classProducts.length !== 0) {
    return (
      <div>
        <MenuBar />
        <div className="products-list">
          {classProducts.map(p => {
            return <SingleProduct key={p.id} product={p} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <MenuBar />
        <h2 className="products-list">
          Please register/login to see your recommended class products
        </h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
  user: state.user,
});

export default connect(mapStateToProps)(Products);
