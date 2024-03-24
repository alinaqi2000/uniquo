import { Category } from "../../models/Category";
import { Competition } from "../../models/Competition";
import { OrganizerCompetition } from "../../models/OrganizerCompetition";
import { DraftCompetition } from "../../models/form/DraftCompetition";
import UIService from "../../services/UIService";

import {
  CompetitionsActions,
  SET_MY_COMPETITIONS,
  SET_RECENT_COMPETITIONS,
  SET_FEED_COMPETITIONS,
  SET_DRAFT_COMPETITION,
  SET_CATEGORIES,
  ADD_MY_COMPETITION,
} from "./competitions.actions";

export interface CompetitionsState {
  categories: Category[];
  feed: Competition[];
  my: OrganizerCompetition[];
  recent: Competition[];
  draft: DraftCompetition;
}
const initialState: CompetitionsState = {
  categories: [],
  feed: [],
  draft: new DraftCompetition(),
  my: [],
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
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_FEED_COMPETITIONS:
      return {
        ...state,
        feed: action.payload,
      };
    case SET_DRAFT_COMPETITION:
      return {
        ...state,
        draft: action.payload,
      };
    case SET_MY_COMPETITIONS:
      return {
        ...state,
        my: action.payload.map((c) => ({ ...c, bgColor: UIService.randomCompetitionColor() })),
      };
    case ADD_MY_COMPETITION:
      return {
        ...state,
        my: [...state.my, action.payload],
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
