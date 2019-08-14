import axios from 'axios';

import {
  FETCH_REVIEWS,
  FETCH_SINGLE_REVIEW,
  POST_REVIEW,
  EDIT_REVIEW,
  DELETE_REVIEW,
} from './actionTypes';

export const listReviewsThunk = () => async dispatch => {
  try {
    const response = await axios.get('/api/reviews');
    dispatch({ type: FETCH_REVIEWS, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const singleReviewThunk = id => async dispatch => {
  try {
    const response = await axios.get(`/api/reviews/${id}`);
    dispatch({ type: FETCH_SINGLE_REVIEW, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const postReviewThunk = review => async dispatch => {
  try {
    const response = await axios.post('/api/reviews', review);
    dispatch({ type: POST_REVIEW, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const editReviewThunk = (id, change) => async dispatch => {
  try {
    const response = await axios.put(`/api/reviews/${id}`, change);
    dispatch({ type: EDIT_REVIEW, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteReviewThunk = review => async dispatch => {
  try {
    await axios.delete(`/api/reviews/${review.id}`);
    dispatch({ type: DELETE_REVIEW, payload: review });
  } catch (err) {
    console.log(err);
  }
};
