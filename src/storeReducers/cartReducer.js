import axios from 'axios'

import store from '../store'

// CONST defs
export const SET_CART = 'SET_CART'

// Actions
const setCart = items => ({
  type: SET_CART,
  items
})

export async function getCart() {
  axios
    .get('/api/cart/getCart')
    .then(result => store.dispatch(setCart(result.data)))
    .catch(e => console.log(e))
}

// I'm hard setting quantity to 1 as default, we can add
// a quantity later I think
export async function createItem(productId, quantity = 1) {
  axios
    .post('/api/cart/createCart', { productId, quantity })
    .then(() => getCart())
    .catch(e => console.log(e))
}

// REDUCE the stuffs
export default (cart = [], action) => {
  switch (action.type) {
    case SET_CART:
      cart = [...action.items]
      break
  }
  return cart
}
