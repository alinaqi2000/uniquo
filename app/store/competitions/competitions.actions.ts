import { Competition } from "../../models/Competition";

export const SET_FEED_COMPETITIONS = "SET_FEED_COMPETITIONS";
export const SET_MY_COMPETITIONS = "SET_MY_COMPETITIONS";
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

type SetMyCompetitions = {
  type: typeof SET_MY_COMPETITIONS;
  payload: Competition[];
};
export const setMyCompetitions = (
  competitions: Competition[]
): SetMyCompetitions => ({
  type: SET_MY_COMPETITIONS,
  payload: competitions,
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
  | SetFeedCompetitions
  | SetMyCompetitions
  | SetRecentCompetitions;
