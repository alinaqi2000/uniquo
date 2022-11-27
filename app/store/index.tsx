import { compose, combineReducers, createStore, applyMiddleware } from "redux";
import app, { AppState } from "./app/app.reducer";
import categories, { CategoriesState } from "./categories/categories.reducer";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import competitions, {
  CompetitionsState,
} from "./competitions/competitions.reducer";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const appReducer = combineReducers({
  app,
  categories,
  competitions,
});
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

export type State = {
  app: AppState;
  categories: CategoriesState;
  competitions: CompetitionsState;
};

export const store = createStore(
  appReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);
