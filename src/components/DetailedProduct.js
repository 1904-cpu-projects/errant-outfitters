import React from "react";
import { connect } from "react-redux";

import store from "../store";
import { getDetailProduct } from "../storeReducers/productsReducer";
import { createItem } from "../storeReducers/cartReducer";

import Reviews from "./Reviews";

function handleBuy(matchId) {
  createItem(matchId);
}

// More to come for this thing, need reviews, and add to cart
// Basics are here!!!
function DetailProduct({ detailProduct, matchId }) {
  //  console.log(detailProduct);
  if (detailProduct.id !== matchId) getDetailProduct(matchId);
  if (!detailProduct) return null;
  else {
    return (
      <div>
        <img
          src={detailProduct.image}
          className={"product-image"}
          alt="Product Image"
        />
	<button onClick={(e) => handleBuy(matchId)}>Buy this stuff!</button>
        <h1>{detailProduct.name}</h1>
        <div>{detailProduct.description}</div>
        <div>INSTOCK | {detailProduct.instock ? "YES" : "NO"}</div>
        <footer>
          <h4>Reviews for the {detailProduct.name}</h4>
          <Reviews product={detailProduct} productId={matchId} />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    detailProduct: state.products.detailProduct,
    matchId: ownProps.match.params.id
  };
};

export default connect(mapStateToProps)(DetailProduct);
