import axios from 'axios';

import {
  SET_PRODUCTS,
  SET_DETAIL_PRODUCT,
  POST_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from './actionTypes';

export const loadProductsInitial = (list, next) => ({
  type: SET_PRODUCTS,
  list,
  next,
});

export const listProductsThunk = (next = 0) => async dispatch => {
  let getRoute = '/api/products';
  if (next) {
    getRoute += `/${next}`;
  }
  try {
    const result = await axios.get(getRoute);
    dispatch(loadProductsInitial(result.data, next));
  } catch (e) {
    console.log('I did a bad', e);
  }
};

export const setDetailProduct = data => ({
  type: SET_DETAIL_PRODUCT,
  data,
});

export const singleProductThunk = id => async dispatch => {
  axios
    .get(`/api/products/${id}`)
    .then(result => dispatch(setDetailProduct(result.data)))
    .catch(e => console.log(e));
};

export const postProductThunk = product => async dispatch => {
  try {
    const response = await axios.post('/api/products', product);
    dispatch({ type: POST_PRODUCT, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const editProductThunk = (productId, item) => async dispatch => {
  try {
    const response = await axios.put(`/api/products/${productId}`, item);
    dispatch({ type: EDIT_PRODUCT, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteProductThunk = product => async dispatch => {
  try {
    await axios.delete(`/api/products/${product.id}`);
    dispatch({ type: DELETE_PRODUCT, payload: product });
    window.location.hash = '/#/';
  } catch (err) {
    console.log(err);
  }
};
