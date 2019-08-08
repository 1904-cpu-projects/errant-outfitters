import { applyMiddleware, combineReducers, createStore } from "redux";
const thunkMiddleware = require("redux-thunk").default;

// Here are where we dump the reducers in!
import productReducer from "./storeReducers/productsReducer";
import reveiwReducer from "./storeReducers/reviewReducer";
import userReducer from "./storeReducers/userReducer";


// Const Defines!!!
/* There are No Defines!!! Only Zule!!! */

// For combineReducers
// I have given the basic boilerplate in ./storeReducers/productsReducer.js
// We just import them in to this file and dump them in this function
// call
const reducer = combineReducers({
  products: productReducer,
  reviews: reveiwReducer
});

export default createStore(reducer, applyMiddleware(thunkMiddleware));
