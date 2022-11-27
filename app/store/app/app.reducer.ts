import { AuthUser } from "../../models/AuthUser";
import {
  ADD_TOKEN,
  AppActions,
  DELETE_TOKEN,
  SET_FIRST_TIME,
  SET_USER,
} from "./app.actions";

export interface AppState {
  token: string;
  user: AuthUser;
  firstTime: boolean;
  isAuth: boolean;
  authenticating: boolean;
}
const initialState: AppState = {
  token: "",
  user: null,
  firstTime: true,
  isAuth: false,
  authenticating: true,
};

type Action = {
  type: string;
  payload?: any;
};

export default (state = initialState, action: AppActions): AppState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_FIRST_TIME:
      return {
        ...state,
        firstTime: action.payload,
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
