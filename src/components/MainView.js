import React from "react";
import { connect } from 'react-redux';

function MainView({ products }) {
  // Lets rip this out when needed, probably goes into Product component
  // but for now this just gets things going
  const Product = products.productList.map((p) => {
			       return (
				 <li key={p.id}>
				   {p.name} : {p.description}
				 </li>
			       ); });
  
  if(products.length === 0) return null;
  return (
    <div className='landing-body'>
      This is where all the main view garbage goes.
      So lets make some garbage eh?
      <ul>
	{Product}
      </ul>
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps)(MainView);
