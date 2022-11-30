import { AuthUser } from "../../models/AuthUser";
import { Notification } from "../../models/Notification";
import {
  ADD_TOKEN,
  AppActions,
  DELETE_TOKEN,
  SET_FIRST_TIME,
  SET_NOTIFICATIONS,
  SET_USER,
} from "./app.actions";

export interface AppState {
  token: string;
  user: AuthUser | null;
  notifications: Notification[];
  firstTime: boolean;
  isAuth: boolean;
  authenticating: boolean;
}
const initialState: AppState = {
  token: "",
  user: null,
  notifications: [],
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
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
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
