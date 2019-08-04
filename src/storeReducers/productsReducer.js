import axios from 'axios';

// This is just to hook in some methods into the main store
import store from '../store';

// Const defines here
export const SET_PRODUCTS = 'SET_PRODUCTS';

// Actions

// list is the literal list of products that get loaded in from the server api
// next is the conditional route which gets sent to the server to get the next
// 25 or so results from a products query
export const loadProductsInitial = (list, next) => (
  {
    type: SET_PRODUCTS,
    list,
    next
  }
);

// helper function that gets products based on productsReducer
export const getProducts = async (next = 0) => {
  let getRoute = '/api/products';
  if(next) {
    getRoute += `/${next}`;
  }
  try{
    const result = await axios.get(getRoute);
    store.dispatch(loadProductsInitial(result.data, next));
  }
  catch(e){
    console.log('I did a bad', e);
  }
};

const init = {
  productList: [],
  next: 0
};

// And of course the reducer
export default (products = init, action) => {
  // Just the boilerplace
  // Need to add more here soon
  const newProducts = {...products};
  switch(action.type) {
  case SET_PRODUCTS:
    // This is the initial load, there should be nothing here
    // at this point in time
    newProducts.productList = [...action.list];
  }
  return newProducts;
};
