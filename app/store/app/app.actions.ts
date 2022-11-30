import { AuthUser } from "../../models/AuthUser";
import { Notification } from "../../models/Notification";

export const SET_USER = "SET_USER";
export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
export const SET_FIRST_TIME = "SET_FIRST_TIME";
export const ADD_TOKEN = "ADD_TOKEN";
export const DELETE_TOKEN = "DELETE_TOKEN";

type SetUser = { type: typeof SET_USER; payload: AuthUser };
export const setUser = (user: AuthUser | null): SetUser => ({
  type: SET_USER,
  payload: user,
});

type SetNotifications = {
  type: typeof SET_NOTIFICATIONS;
  payload: Notification[];
};
export const setNotifications = (
  notifications: Notification[]
): SetNotifications => ({
  type: SET_NOTIFICATIONS,
  payload: notifications,
});

type SetFirstTime = { type: typeof SET_FIRST_TIME; payload: boolean };
export const setFirstTime = (firstTime: boolean): SetFirstTime => ({
  type: SET_FIRST_TIME,
  payload: firstTime,
});

type AddToken = { type: typeof ADD_TOKEN; payload: string };
export const addToken = (token: string): AddToken => ({
  type: ADD_TOKEN,
  payload: token,
});

type DeleteToken = { type: typeof DELETE_TOKEN };
export const deleteToken = (): DeleteToken => ({
  type: DELETE_TOKEN,
});

export type AppActions =
  | SetUser
  | SetNotifications
  | AddToken
  | DeleteToken
  | SetFirstTime;
