import {
  FETCH_REVIEWS,
  FETCH_SINGLE_REVIEW,
  POST_REVIEW,
  EDIT_REVIEW,
  DELETE_REVIEW
} from "./actionTypes";

import axios from "axios";

export const listReviews = () => async dispatch => {
  try {
    const response = await axios.get("/api/reviews");
    dispatch({ type: FETCH_REVIEWS, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const singleReview = id => async dispatch => {
  try {
    const response = await axios.get(`/api/reviews/${id}`);
    dispatch({ type: FETCH_SINGLE_REVIEW, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const postReview = review => async dispatch => {
  try {
    const response = await axios.post("/api/reviews", review);
    dispatch({ type: POST_REVIEW, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const editReview = (id, change) => async dispatch => {
  try {
    const response = await axios.put(`/api/reviews/${id}`, change);
    dispatch({ type: EDIT_REVIEW, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteReview = id => async dispatch => {
  try {
    const response = await axios.delete(`/api/reviews/${id}`);
    dispatch({ type: DELETE_REVIEW, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
