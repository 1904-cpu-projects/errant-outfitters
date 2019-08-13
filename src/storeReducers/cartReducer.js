import axios from 'axios';
import { createError, removeError } from './errorReducer';
// CONST defs
export const SET_CART = 'SET_CART';
export const SET_GUEST_CART = 'SET_GUEST_CART';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_GUEST_ITEM = 'DELETE_GUEST_ITEM';

// Actions
const setCart = items => ({
  type: SET_CART,
  items,
});

const setGuestCart = items => ({
  type: SET_GUEST_CART,
  items,
});

const deleteItem = id => ({
  type: DELETE_ITEM,
  id: id,
});

const deleteGuestItem = id => ({
  type: DELETE_GUEST_ITEM,
  id: id,
});

// This function got a little out of control, if anyone can think of a way to
// reduce this let me know. Its really not that bad, but certainly adds some
// complexity to what is actually happening with the cart.
export const getCart = (userLogin = false) => (dispatch, getStore) => {
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
      if (userLogin) {
        const existingStore = getStore();
        if (
          existingStore.cart.items.length &&
          existingStore.cart.items[0].memberStatus === 'guest'
        ) {
          dispatch(setGuestCart([...existingStore.cart.items]));
          dispatch(
            createError(
              'CART',
              'You had items in your cart before logging in. Please goto your cart and check to add them to your cart or these items will be lost',
            ),
          );
        }
      }
      dispatch(setCart(cart));
    })
    .catch(e => console.log(e));
};

export const deleteCartItem = (id) => (dispatch, getStore) => {
  axios
    .delete('/api/cart/deleteCartItem', { data: { id: id } })
    .then(() => {
      const store = getStore();
      let guestOrUser = store.cart.items.filter(i => i.id === id);
      if(guestOrUser.length) {
	dispatch(deleteItem(id));
      }
      else {
	dispatch(deleteGuestItem(id));
	if(store.cart.guest.length === 1)
	  dispatch(removeError(
              'CART',
              'You had items in your cart before logging in. Please goto your cart and check to add them to your cart or these items will be lost',
          ));
      }
      
    })
    .catch(e => console.log(e));
};

// I'm hard setting quantity to 1 as default, we can add
// a quantity later I think
export const createItem = (productId, quantity = 1) => dispatch => {
  axios
    .post('/api/cart/createCart', { productId, quantity })
    .then(() => dispatch(getCart()))
    .catch(e => console.log(e));
};

// REDUCE the stuffs
export default (cart = { items: [], guest: [] }, action) => {
  switch (action.type) {
    case SET_CART:
      cart.items = [...action.items];
      break;
    case SET_GUEST_CART:
      cart.guest = [...action.items];
      break;
    case DELETE_ITEM:
      cart.items = cart.items.filter(i => i.id !== action.id);
    break;
  case DELETE_GUEST_ITEM:
    cart.guest = cart.guest.filter(i => i.id !== action.id);
    break;
  }
  return cart;
};
