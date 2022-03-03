import axios from "axios";

//ACTION TYPES
const SET_PRODUCTS = "SET_PRODUCTS";

//ACTION CREATORS
const _setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

//THUNK
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products");
      dispatch(_setProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProductCount = (productId, cartItemAmount) => {
  return async () => {
    try {
      const { data: product } = await axios.put(
        `/api/products/updatecount/${productId}`,
        { cartItemAmount }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
