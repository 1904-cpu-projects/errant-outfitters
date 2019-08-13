import {
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  SET_DETAIL_PRODUCT,
  POST_PRODUCT,
} from '../actions/actionTypes';

// list is the literal list of products that get loaded in from the server api
// next is the conditional route which gets sent to the server to get the next
// 25 or so results from a products query

const init = {
  productList: [],
  detailProduct: {},
  next: 0,
};

// And of course the reducer
export default (products = init, action) => {
  // Just the boilerplace
  // Need to add more here soon
  const newProducts = { ...products };
  switch (action.type) {
    case SET_PRODUCTS:
      // This is the initial load, there should be nothing here
      // at this point in time
      newProducts.productList = [...action.list];
      break;
    case SET_DETAIL_PRODUCT:
      newProducts.detailProduct = { ...action.data };
      break;

    case EDIT_PRODUCT:
      return {
        ...products,
        productList: products.productList.map(item =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };

    case DELETE_PRODUCT:
      return {
        ...products,
        productList: products.productList.filter(
          item => item.id !== action.payload.id,
        ),
      };

    case POST_PRODUCT:
      return {
        ...products,
        productList: [...products.productList, action.payload],
      };
  }
  return newProducts;
};
