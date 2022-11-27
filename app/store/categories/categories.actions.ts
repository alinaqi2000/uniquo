import { Category } from "../../models/Category";

export const SET_TOP_CATEGORIES = "SET_TOP_CATEGORIES";
export const SET_NEW_CATEGORIES = "SET_NEW_CATEGORIES";
export const SET_RECENT_CATEGORIES = "SET_RECENT_CATEGORIES";

type SetTopCategories = {
  type: typeof SET_TOP_CATEGORIES;
  payload: Category[];
};
export const setTopCategories = (categories: Category[]): SetTopCategories => ({
  type: SET_TOP_CATEGORIES,
  payload: categories,
});

type SetNewCategories = {
  type: typeof SET_NEW_CATEGORIES;
  payload: Category[];
};
export const setNewCategories = (categories: Category[]): SetNewCategories => ({
  type: SET_NEW_CATEGORIES,
  payload: categories,
});

type SetRecentCategories = {
  type: typeof SET_RECENT_CATEGORIES;
  payload: Category[];
};
export const setRecentCategories = (
  categories: Category[]
): SetRecentCategories => ({
  type: SET_RECENT_CATEGORIES,
  payload: categories,
});

export type CategoriesActions =
  | SetTopCategories
  | SetNewCategories
  | SetRecentCategories;
