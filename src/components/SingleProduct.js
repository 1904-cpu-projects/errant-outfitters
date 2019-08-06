import React from "react";

export function SingleProduct( {product} ) {
  return(
    <div className='product-card'>
      <img src={product.image} alt="Product Image"/>
      <div>
        <h3> {product.name} </h3>
        <h3> {product.cost} </h3>
        <p> {product.description} </p>
      </div>

      <button>Add to Cart</button>
      <h4> {product.inStock} </h4>
    </div>
  );
}
