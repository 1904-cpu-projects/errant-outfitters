import axios from "axios";

// This is just to hook in some methods into the main store
import store from "../store";

// Const defines here
export const SET_USER = "SET_USER";

// Actions

// This sets user information that is received from the server
// isAdmin: is initially 'guest' and can only otherwise be 'user' or 'admin'
export const loadUser = user => ({
  type: SET_USER,
  user
});

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("/api/login/login", { email, password });
    console.log(response.data);
    store.dispatch(loadUser(response.data));
  } catch (e) {
    console.log("something did not go right");
  }
};

// helper function that gets products based on productsReducer
export const checkSessionLogin = async () => {
  try {
    const result = await axios.get("/api/login/checkLoggedIn");
    store.dispatch(loadUser(result.data));
  } catch (e) {
    console.log("Nick has no clue what he is doing", e);
  }
};

const init = {
  userId: "guest",
  isAdmin: false
};

// And of course the reducer
export default (user = init, action) => {
  let newUser = { ...user };
  switch (action.type) {
    case SET_USER:
      newUser = { ...action.user };
  }
  return newUser;
};
