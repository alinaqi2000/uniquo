import { combineReducers } from "redux";
import todo from "./app/app.reducer";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

const appReducer = combineReducers({
  todo,
});

export type State = {
  todo: { userTodo: string[] };
};

export const store = configureStore({
  reducer: appReducer,
  middleware: [thunk],
});
