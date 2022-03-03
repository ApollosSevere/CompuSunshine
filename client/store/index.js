import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";

import auth from "./auth";
import userReducer from "./user";
import cartReducer from "./cart";
import usersReducer from "./users";
import orderReducer from "./order";
import ordersReducer from "./orders";
import productReducer from "./product";
import productsReducer from "./products";
import adminProductsReducer from "./adminproducts";

const reducer = combineReducers({
  auth,
  cart: cartReducer,
  user: userReducer,
  users: usersReducer,
  order: orderReducer,
  orders: ordersReducer,
  product: productReducer,
  products: productsReducer,
  adminproducts: adminProductsReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
