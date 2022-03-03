import axios from "axios";

//ACTION
const SET_PRODUCT = "SET_PRODUCT";

//ACTION CREATOR
export const _setProduct = (product) => {
  return {
    type: SET_PRODUCT,
    product,
  };
};

//THUNK
export const fetchProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${productId}`);
      dispatch(_setProduct(product));
    } catch (error) {
      console.log(error);
    }
  };
};

//THUNK
export const addReview = (review) => {
  return async (dispatch) => {
    try {
      const { data: updatedProduct } = await axios.post(
        `/api/products/review`,
        review
      );
      dispatch(_setProduct(updatedProduct));
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
export default function productReducer(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
