import { Category } from "../../models/Category";
import { Competition } from "../../models/Competition";
import { User } from "../../models/User";
import {
  CompetitionsActions,
  SET_MY_COMPETITIONS,
  SET_RECENT_COMPETITIONS,
  SET_FEED_COMPETITIONS,
} from "./competitions.actions";

export interface CompetitionsState {
  feed: Competition[];
  my: Competition[];
  recent: Competition[];
}
const initialState: CompetitionsState = {
  feed: [],
  my: [
    // new Competition(2, "Art & Culture", "art-culture"),
    // new Competition(1, "Sports", "sports"),
    // new Competition(4, "Cars", "cars"),
    // new Competition(3, "Memes", "memes"),
  ],
  recent: [
    // new Competition(3, "Memes", "memes"),
    // new Competition(2, "Art & Culture", "art-culture"),
    // new Competition(4, "Cars", "cars"),
    // new Competition(1, "Sports", "sports"),
  ],
};

export default (
  state = initialState,
  action: CompetitionsActions
): CompetitionsState => {
  switch (action.type) {
    case SET_FEED_COMPETITIONS:
      return {
        ...state,
        feed: action.payload,
      };
    case SET_MY_COMPETITIONS:
      return {
        ...state,
        my: action.payload,
      };
    case SET_RECENT_COMPETITIONS:
      return {
        ...state,
        recent: action.payload,
      };

    default:
      return state;
  }
};
