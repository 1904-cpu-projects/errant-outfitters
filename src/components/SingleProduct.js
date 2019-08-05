import React from "react";

export function SingleProduct( {product} ) {
  return(
    <div>
      <img src={product.image} alt="Product Image"/>
      <h3> {product.name} </h3>
      <h3> {product.cost} </h3>
      <h4> Details </h4>
      <button>Add to Cart</button>
      <h4> {product.inStock} </h4>
    </div>
  );
}
