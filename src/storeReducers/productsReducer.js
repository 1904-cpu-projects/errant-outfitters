import {
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  SET_DETAIL_PRODUCT,
  POST_PRODUCT,
} from '../actions/actionTypes';

const init = {
  productList: [],
  detailProduct: {},
  next: 0,
};

// And of course the reducer
export default (products = init, action) => {
  const newProducts = { ...products };
  switch (action.type) {
    case SET_PRODUCTS:
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
