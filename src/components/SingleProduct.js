import React from "react";
import Reviews from "./Reviews";

export function SingleProduct({ product }) {
  let stocked = "No";
  if (product.inStock) {
    stocked = "Yes";
  }

  return (
    <div key={product.id} className="product-card">
      <img className="product-image" src={product.image} alt="Product Image" />
      <div>
        <h3>
          <b> {product.name} </b>
        </h3>
        <p> {product.description.slice(0, 50) + "..."} </p>
      </div>
      <h4> In Stock: {stocked} </h4>
      <Reviews product={product} />
    </div>
  );
}
