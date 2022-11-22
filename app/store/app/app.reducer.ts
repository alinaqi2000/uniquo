import { User } from "../../models/User";
import { ADD_TOKEN, AppActions, DELETE_TOKEN, SET_USER } from "./app.actions";

export interface AppState {
  token: string;
  user: User;
}
const initialState: AppState = {
  token: "",
  user: null,
};

type Action = {
  type: string;
  payload?: any;
};

export default (state = initialState, action: AppActions) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ADD_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case DELETE_TOKEN:
      return {
        ...state,
        token: "",
      };

    default:
      return state;
  }
};
