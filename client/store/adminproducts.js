import axios from "axios";

const TOKEN = "token";

const initialState = {
  allProducts: [],
  singleProduct: {},
};

/**
 * ACTION TYPES
 */
const SET_ALL_PRODUCTS = "SET_ALL_PRODUCTS";
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";
const UPDATE_SINGLE_PRODUCT = "UPDATE_SINGLE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const CREATE_PRODUCT = "CREATE_PRODUCT";

/**
 * ACTION CREATORS
 */
const setAllProducts = (products) => {
  return {
    type: SET_ALL_PRODUCTS,
    products,
  };
};

export const setSingleProduct = (product) => {
  console.log("on Me");
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  };
};

const updateSingleProduct = (product) => {
  return {
    type: UPDATE_SINGLE_PRODUCT,
    product,
  };
};

const _deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

const _createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

/**
 * THUNK CREATORS
 */
export const fetchAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products");
      console.log("hey", products);
      dispatch(setAllProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    const { data: product } = await axios.get(`/api/products/${productId}`);
    console.log(product, "Store level");
    const action = setSingleProduct(product);
    dispatch(action);
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.post("/api/products", product, {
        headers: {
          authorization: token,
        },
      });
      const action = _createProduct(data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateProduct = (productId, product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.put(`/api/products/${productId}`, product, {
        headers: {
          authorization: token,
        },
      });
      const action = updateSingleProduct(data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.delete(`/api/products/${productId}`, {
        headers: {
          authorization: token,
        },
      });
      const action = _deleteProduct(data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};
/**
 * REDUCER
 */
export default function adminProductsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return { ...state, allProducts: action.products };
    case SET_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.product };
    case CREATE_PRODUCT:
      return { ...state, allProducts: [...state.allProducts, action.product] };
    case UPDATE_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.product };
    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter(
          (product) => product.id !== action.product.id
        ),
      };
    default:
      return state;
  }
}
