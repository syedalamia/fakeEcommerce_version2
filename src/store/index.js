import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import CartReducer from "./reducer/cartReducer";
import productReducer from "./reducer/productReducer";
import loaderReducer from "./reducer/loaderReducer";
import sessionReducer from "./reducer/sessionReducer";
import categoryReducer from "./reducer/categoryReducer";
import notificationReducer from "./reducer/notificationReducer";
import orderReducer from "./reducer/orderReducer";
import userReducer from "./reducer/userReducer";

import thunk from "redux-thunk"; //eta hocche store bola jaite pare
const mainReducer = combineReducers({
  //all reducer combo korse
  cartStore: CartReducer,
  productStore: productReducer,
  loaderStore: loaderReducer,
  sessionStore: sessionReducer,
  categoryStore: categoryReducer,
  notificationStore: notificationReducer,
  orderStore: orderReducer,
  userStore: userReducer,
});
// eta store create er jonno base instruction
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //dev tool er sthe connection nise
const store = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(thunk)) //middle ware hishebe thunk nise
);
export default store;
