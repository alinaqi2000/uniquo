import { User } from "../../models/User";

export const SET_USER = "SET_USER";
export const ADD_TOKEN = "ADD_TOKEN";
export const DELETE_TOKEN = "DELETE_TOKEN";

type SetUser = { type: typeof SET_USER; payload: User };
export const setUser = (user: User): SetUser => ({
  type: SET_USER,
  payload: user,
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

export type AppActions = SetUser | AddToken | DeleteToken;
