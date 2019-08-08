import React from "react";
import { connect } from "react-redux";

import store from "../store";
import { getDetailProduct } from "../storeReducers/productsReducer";

// More to come for this thing, need reviews, and add to cart
// Basics are here!!!
function DetailProduct({ detailProduct, id }) {
//  console.log(detailProduct);
  console.log(store.getState());
  if(detailProduct.id !== id)
    getDetailProduct(id);
  if(!detailProduct) return null;
  else {
    return(
      <div>
	<img src={detailProduct.image} className={'product-image'} alt="Product Image"/>
	<h1>{detailProduct.name}</h1>
	<div>{detailProduct.description}</div>
	<div>INSTOCK | {detailProduct.instock ? "YES" : "NO"}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return (
    {
      detailProduct: state.products.detailProduct,
      id: ownProps.match.params.id
    }
  );
};

export default connect(mapStateToProps)(DetailProduct);
