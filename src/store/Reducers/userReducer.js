import { userLogged } from "../types";

export default function userReducer(state = null, action) {
  switch (action.type) {
    case userLogged:
      return action.payload;
    default:
      return state;
  }
}
