import axios from 'axios';

import store from '../store';

// CONST defs
export const SET_CART = 'SET_CART';
export const DELETE_ITEM = 'DELETE_ITEM';

// Actions
const setCart = items => ({
  type: SET_CART,
  items,
});

const deleteItem = id => ({
  type: DELETE_ITEM,
  id: id,
});

export function getCart() {
  axios
    .get('/api/cart/getCartProducts')
    .then(({ data }) => {
      const { cart, products } = data;
      cart.forEach(elem => {
        elem.product = products.reduce((acc, p) => {
          if (acc) return acc;
          if (elem.productId === p.id) return p;
          else return undefined;
        }, undefined);
      });
      store.dispatch(setCart(cart));
    })
    .catch(e => console.log(e));
}

export function deleteCartItem(id) {
  axios
    .delete('/api/cart/deleteCartItem', { data: { id: id } })
    .then(store.dispatch(deleteItem(id)))
    .catch(e => console.log(e));
}

// I'm hard setting quantity to 1 as default, we can add
// a quantity later I think
export async function createItem(productId, quantity = 1) {
  axios
    .post('/api/cart/createCart', { productId, quantity })
    .then(() => getCart())
    .catch(e => console.log(e));
}

// REDUCE the stuffs
export default (cart = [], action) => {
  switch (action.type) {
    case SET_CART:
      cart = [...action.items];
      break;
    case DELETE_ITEM:
      cart = cart.filter(i => i.id !== action.id);
      break;
  }
  return cart;
};
