import React from "react";
import { connect } from "react-redux";
import { getDetailProduct } from "../storeReducers/productsReducer";
<<<<<<< HEAD
import { createItem } from "../storeReducers/cartReducer";
=======
import CreateReview from "../components/CreateReview";
>>>>>>> dev

import Reviews from "./Reviews";

function handleBuy(matchId) {
  createItem(matchId);
}

// More to come for this thing, need reviews, and add to cart
// Basics are here!!!
<<<<<<< HEAD
function DetailProduct({ detailProduct, matchId }) {
  //  console.log(detailProduct);
  if (detailProduct.id !== matchId) getDetailProduct(matchId);
=======
function DetailProduct({ detailProduct, id, user }) {
  console.log("DETAILED PRODUCT", user);
  if (detailProduct.id !== id) getDetailProduct(id);
>>>>>>> dev
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
        <h4>Like this product? Consider logging in and writing a review</h4>
        {user.id ? <CreateReview product={detailProduct} /> : ""}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    detailProduct: state.products.detailProduct,
<<<<<<< HEAD
    matchId: ownProps.match.params.id
=======
    id: ownProps.match.params.id,
    user: state.user
>>>>>>> dev
  };
};

export default connect(mapStateToProps)(DetailProduct);
