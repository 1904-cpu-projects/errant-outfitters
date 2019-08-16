//Const defines here
export const CREATE_ERROR = 'CREATE_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

//actions
export const createError = (context, error) => dispatch => {
  dispatch({ type: CREATE_ERROR, context, error });
};

export const removeError = (context, error) => dispatch => {
  dispatch({ type: REMOVE_ERROR, context, error });
};

// CONSTANTS for what I think are good types of errors
// SERVER: any error generated from the server
// CART: any error related to the front end cart itself
// USER: any error related to the user
// ADMIN: of course admins make errors
// ...

// The context is the actual CONSTANT used, which are an object key
// every object key is an array of the the error test
// So wild. Make stuff. Go BANANAS!

export default (errors = {}, action) => {
  const newErrors = { ...errors };
  switch (action.type) {
    case CREATE_ERROR:
      if (newErrors[action.context])
        newErrors[action.context] = [
          ...newErrors[action.context],
          action.error,
        ];
      else newErrors[action.context] = [action.error];
      break;
  case REMOVE_ERROR:
    console.log("this happened!");
      newErrors[action.context] = newErrors[action.context].filter(
        e => e !== action.error,
      );
      break;
  }
  return newErrors;
};
