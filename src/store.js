import {applyMiddleware, combineReducers, createStore} from 'redux';
const thunkMiddleware = require("redux-thunk").default;

// Const Defines!!!
   /* There are No Defines!!! Only Zule!!! */

// action Methods
   /* Whenever we get there */

// This is just the most basic thing possible just to get the
// Ball rolling, we should probably be using combinereducers
// In the end!

const reducer =  (state = [], action)=> {
  // I will add stuff here soon!
  return state;
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;
