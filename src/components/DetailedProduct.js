import React from "react";
import { connect } from "react-redux";
import { getDetailProduct } from "../storeReducers/productsReducer";
import CreateReview from "../components/CreateReview";

import Reviews from "./Reviews";

// More to come for this thing, need reviews, and add to cart
// Basics are here!!!
function DetailProduct({ detailProduct, id, user }) {
  console.log("DETAILED PRODUCT", user);
  if (detailProduct.id !== id) getDetailProduct(id);
  if (!detailProduct) return null;
  else {
    return (
      <div>
        <img
          src={detailProduct.image}
          className={"product-image"}
          alt="Product Image"
        />
        <h1>{detailProduct.name}</h1>
        <div>{detailProduct.description}</div>
        <div>INSTOCK | {detailProduct.instock ? "YES" : "NO"}</div>
        <footer>
          <h4>Reviews for the {detailProduct.name}</h4>
          <Reviews product={detailProduct} productId={id} />
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
    id: ownProps.match.params.id,
    user: state.user
  };
};

export default connect(mapStateToProps)(DetailProduct);
