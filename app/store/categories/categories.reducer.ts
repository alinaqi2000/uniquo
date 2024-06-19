import { Category } from "../../models/Category";
import {
  CategoriesActions,
  SET_NEW_CATEGORIES,
  SET_RECENT_CATEGORIES,
  SET_TOP_CATEGORIES,
} from "./categories.actions";

export interface CategoriesState {
  top: Category[];
  newC: Category[];
  recent: Category[];
}
const initialState: CategoriesState = {
  top: [
    // new Category(1, "Sports", "sports"),
    // new Category(2, "Art & Culture", "art-culture"),
    // new Category(3, "Memes", "memes"),
    // new Category(4, "Cars", "cars"),
  ],
  newC: [
    // new Category(2, "Art & Culture", "art-culture"),
    // new Category(1, "Sports", "sports"),
    // new Category(4, "Cars", "cars"),
    // new Category(3, "Memes", "memes"),
  ],
  recent: [
    // new Category(3, "Memes", "memes"),
    // new Category(2, "Art & Culture", "art-culture"),
    // new Category(4, "Cars", "cars"),
    // new Category(1, "Sports", "sports"),
  ],
};

export default (
  state = initialState,
  action: CategoriesActions
): CategoriesState => {
  switch (action.type) {
    case SET_TOP_CATEGORIES:
      return {
        ...state,
        top: action.payload,
      };
    case SET_NEW_CATEGORIES:
      return {
        ...state,
        newC: action.payload,
      };
    case SET_RECENT_CATEGORIES:
      return {
        ...state,
        recent: action.payload,
      };

    default:
      return state;
  }
};
