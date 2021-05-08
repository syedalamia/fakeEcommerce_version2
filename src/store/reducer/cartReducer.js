import { ActionTypes } from "../types";
const INITIAL_STATE = {
  count: 0,
  productList: [],
};

const CartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_CART_INFO:
      return {
        ...state,
        count: action.payload.products.length,
        productList: action.payload.products,
      };
    default:
      return state;
  }
};

export default CartReducer;
