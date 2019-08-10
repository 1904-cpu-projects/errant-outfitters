import axios from "axios";

import store from "../store";

// CONST defs
export const SET_CART = "SET_CART";


// Actions
const setCart = (items) => (
  {
    type: SET_CART,
    items
  }
);

export async function getCart() {
  axios.get('/api/cart/getCart')
    .then(result => store.dispatch(setCart(result.data)))
    .catch(e => console.log(e));  
}

// Initial cart state
const init = {
  items: []
};

// REDUCE the stuffs
export default ( cart = init, action) => {
  switch(action.type) {
  case SET_CART:
    cart.items = [...action.cart];
    break;
  }
  return cart;
}
