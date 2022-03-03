import axios from "axios";

const TOKEN = "token";
const token = window.localStorage.getItem(TOKEN);

//ACTION
const SET_ORDERS = "SET_ORDERS";

//ACTION CREATOR
export const _setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    orders,
  };
};

//THUNK
export const fetchOrders = (userId) => {
  return async (dispatch) => {
    try {
      const { data: orders } = await axios.get(
        `/api/orders/${userId}/pastOrders`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(_setOrders(orders));
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
export default function ordersReducer(state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
