import { Category } from "../../models/Category";
import { Competition } from "../../models/Competition";
import { OrganizerCompetition } from "../../models/OrganizerCompetition";
import { DraftCompetition } from "../../models/form/DraftCompetition";

export const SET_FEED_COMPETITIONS = "SET_FEED_COMPETITIONS";
export const SET_PROFILE_FEED_COMPETITIONS = "SET_PROFILE_FEED_COMPETITIONS";
export const SET_DRAFT_COMPETITION = "SET_DRAFT_COMPETITION";
export const SET_MY_COMPETITIONS = "SET_MY_COMPETITIONS";
export const ADD_MY_COMPETITION = "ADD_MY_COMPETITION";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_RECENT_COMPETITIONS = "SET_RECENT_COMPETITIONS";

type SetFeedCompetitions = {
  type: typeof SET_FEED_COMPETITIONS;
  payload: Competition[];
};
export const setFeedCompetitions = (
  competitions: Competition[]
): SetFeedCompetitions => ({
  type: SET_FEED_COMPETITIONS,
  payload: competitions,
});
type SetProfileFeedCompetitions = {
  type: typeof SET_PROFILE_FEED_COMPETITIONS;
  payload: Competition[];
};
export const setProfileFeedCompetitions = (
  competitions: Competition[]
): SetProfileFeedCompetitions => ({
  type: SET_PROFILE_FEED_COMPETITIONS,
  payload: competitions,
});
type SetDraftCompetition = {
  type: typeof SET_DRAFT_COMPETITION;
  payload: DraftCompetition;
};
export const setDraftCompetition = (
  competition: DraftCompetition
): SetDraftCompetition => ({
  type: SET_DRAFT_COMPETITION,
  payload: competition,
});

type SetMyCompetitions = {
  type: typeof SET_MY_COMPETITIONS;
  payload: OrganizerCompetition[];
};
export const setMyCompetitions = (
  competitions: OrganizerCompetition[]
): SetMyCompetitions => ({
  type: SET_MY_COMPETITIONS,
  payload: competitions,
});

type AddMyCompetition = {
  type: typeof ADD_MY_COMPETITION;
  payload: OrganizerCompetition;
};
export const addMyCompetition = (
  competition: OrganizerCompetition
): AddMyCompetition => ({
  type: ADD_MY_COMPETITION,
  payload: competition,
});

type SetCategories = {
  type: typeof SET_CATEGORIES;
  payload: Category[];
};
export const setCategories = (
  categories: Category[]
): SetCategories => ({
  type: SET_CATEGORIES,
  payload: categories,
});
type SetRecentCompetitions = {
  type: typeof SET_RECENT_COMPETITIONS;
  payload: Competition[];
};
export const setRecentCompetitions = (
  competitions: Competition[]
): SetRecentCompetitions => ({
  type: SET_RECENT_COMPETITIONS,
  payload: competitions,
});

export type CompetitionsActions =
  SetCategories
  | SetFeedCompetitions
  | SetProfileFeedCompetitions
  | SetDraftCompetition
  | SetMyCompetitions
  | AddMyCompetition
  | SetRecentCompetitions;
