import { COUNT, ADDCART, REMOVECART } from "../actionTypes/actionTypes";


const initialState = localStorage.getItem("profile") && localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];

     
     


const countReducer = (state = initialState.length, action) => {
  switch (action.type) {
    case COUNT:
      const cart = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];
      return (state = cart.length);

    case ADDCART:
      return (state = state + 1);

    case REMOVECART:
      let cartItem = state;
      if (cartItem === 1) {
        cartItem = 0;
      } else {
        cartItem = state - 1;
      }
      console.log(cartItem)
      return (state = cartItem);

    default:
      return state;
  }
};
export default countReducer;
