import {
  FETCH_REVIEWS,
  FETCH_SINGLE_REVIEW,
  POST_REVIEW,
  EDIT_REVIEW,
  DELETE_REVIEW,
} from '../actions/actionTypes';

const initialState = {
  reviews: [],
  singleReview: {},
};

const reveiwReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS:
      return { ...state, reviews: action.payload };

    case FETCH_SINGLE_REVIEW:
      return { ...state, singleReview: action.payload };

    case POST_REVIEW:
      return { ...state, reviews: [...state.reviews, action.payload] };

    case EDIT_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(item =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };

    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(item => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default reveiwReducer;
