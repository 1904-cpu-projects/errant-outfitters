import React from "react";
import { connect } from "react-redux";
import { SingleProduct } from "./SingleProduct";
import MainView from "./MenuBar";


function Products( {products} ) {
  //function to make tiles from SinlgleProduct component
  const tileProducts = products.productList.map((p) => {
    return(<SingleProduct key={p.id} product={p}/>)
  });
  return (
  <div className='products-list'>
      {tileProducts}
  </div>
  );
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps)(Products)
