import { Post } from "../../models/Post";

export const SET_FEED_POSTS = "SET_FEED_POSTS";
export const SET_MY_POSTS = "SET_MY_POSTS";
export const SET_REPORTED_POSTS = "SET_REPORTED_POSTS";

type SetFeedPosts = {
  type: typeof SET_FEED_POSTS;
  payload: Post[];
};
export const setFeedPosts = (posts: Post[]): SetFeedPosts => ({
  type: SET_FEED_POSTS,
  payload: posts,
});

type SetMyPosts = {
  type: typeof SET_MY_POSTS;
  payload: Post[];
};
export const setMyPosts = (posts: Post[]): SetMyPosts => ({
  type: SET_MY_POSTS,
  payload: posts,
});

type SetReportedPosts = {
  type: typeof SET_REPORTED_POSTS;
  payload: Post[];
};
export const setReportedPosts = (posts: Post[]): SetReportedPosts => ({
  type: SET_REPORTED_POSTS,
  payload: posts,
});

export type PostsActions = SetFeedPosts | SetMyPosts | SetReportedPosts;
