import React from "react";

export function SingleProduct( {product} ) {
  let stocked = 'No';
  if (product.inStock) {
    stocked = 'Yes'
  };
  return(
    <div key={product.id} className='product-card'>
      <img className='product-image' src={product.image} alt="Product Image"/>
      <div>
        <h3><b> {product.name} </b></h3>
        <h3> Price: {product.cost} </h3>
        <p> {product.description} </p>
      </div>
      <button>Add to Cart</button>
      <h4> In Stock: {stocked} </h4>
    </div>
  );
}