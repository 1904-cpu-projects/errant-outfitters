import axios from 'axios';

// Const defines here
export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const EDIT_USER = 'EDIT_USER';

// Actions

// This sets user information that is received from the server
// isAdmin: is initially 'guest' and can only otherwise be 'user' or 'admin'
export const loadUser = user => ({
  type: SET_USER,
  user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const loginUser = (email, password) => async dispatch => {
  try {
    const response = await axios.post('/api/login/login', { email, password });
    dispatch(loadUser(response.data));
  } catch (e) {
    console.log('something did not go right');
  }
};

export const logoutUser = () => async dispatch => {
  try {
    const response = axios.get('/api/login/logout');
    dispatch(removeUser());
  } catch (e) {
    console.log('Logout should never fail');
  }
};

// helper function that gets products based on productsReducer
export const checkSessionLogin = () => async dispatch => {
  try {
    const result = await axios.get('/api/login/checkLoggedIn');
    dispatch(loadUser(result.data));
  } catch (e) {
    console.log('Nick has no clue what he is doing', e);
  }
};

//Edit user information
export const editUserThunk = (userId, user) => async dispatch => {
  try {
    const response = await axios.put(`/api/users/${userId}`, user);
    dispatch({ type: EDIT_USER, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

const init = {
  id: undefined,
  isAdmin: false,
  class: '',
  email: '',
  password: '',
};

// And of course the reducer
export default (user = init, action) => {
  let newUser = { ...user };
  switch (action.type) {
    case SET_USER:
      newUser = { ...action.user };
      break;
    case REMOVE_USER:
      newUser = { id: undefined, isAdmin: false };
      break;

    case EDIT_USER:
      return { ...user, ...action.payload };
  }
  return newUser;
};
