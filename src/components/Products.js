import React from "react";
import { connect } from "react-redux";
import { SingleProduct } from "./SingleProduct";
import MainView from "./MainView";


function Products( {products} ) {
  //function to make tiles from SinlgleProduct component
  const tileProducts = products.productList.map((p) => {
    return(<SingleProduct product={p}/>)
  });
  return (
  <div className='products-list'>
    <div>
      {tileProducts}
    </div>
  </div>
  );
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps)(Products)
