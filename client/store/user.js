import axios from "axios";

//ACTION
const UPDATE_USER = "UPDATE_USER";

//ACTION CREATOR
export const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

//THUNK
export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/user/${user.id}`, user);
      dispatch(_updateUser(updated));
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
}
