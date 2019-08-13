import axios from 'axios';

import {
  SET_PRODUCTS,
  SET_DETAIL_PRODUCT,
  POST_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from './actionTypes';

export const listProductsThunk = () => async dispatch => {
  try {
    const response = await axios.get('/api/products');
    dispatch({ type: SET_PRODUCTS, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const singleProductThunk = id => async dispatch => {
  try {
    const response = await axios.get(`/api/products/${id}`);
    dispatch({ type: SET_DETAIL_PRODUCT, payload: response.data });
  } catch (err) {
    console.error(err);
  }
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
