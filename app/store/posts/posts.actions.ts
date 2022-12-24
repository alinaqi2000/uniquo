import { Post } from "../../models/Post";
import { PostComment } from "../../models/PostComment";

export const SET_FEED_POSTS = "SET_FEED_POSTS";
export const SET_MY_POSTS = "SET_MY_POSTS";
export const SET_VOTED_POSTS = "SET_VOTED_POSTS";
export const SET_REPORTED_POSTS = "SET_REPORTED_POSTS";
export const SET_COMMENT_POST = "SET_COMMENT_POST";
export const SET_POST_COMMENTS = "SET_POST_COMMENTS";
export const SET_REPLY_TO = "SET_REPLY_TO";

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

type SetVotedPosts = {
  type: typeof SET_VOTED_POSTS;
  payload: Post[];
};
export const setVotedPosts = (posts: Post[]): SetVotedPosts => ({
  type: SET_VOTED_POSTS,
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

type SetCommentPost = {
  type: typeof SET_COMMENT_POST;
  payload: Post | null;
};
export const setCommentPost = (post: Post | null): SetCommentPost => ({
  type: SET_COMMENT_POST,
  payload: post,
});
type SetPostComments = {
  type: typeof SET_POST_COMMENTS;
  payload: PostComment[];
};
export const setPostComments = (comments: PostComment[]): SetPostComments => ({
  type: SET_POST_COMMENTS,
  payload: comments,
});

type SetReplyTo = {
  type: typeof SET_REPLY_TO;
  payload: PostComment | null;
};
export const setReplyTo = (comment: PostComment | null): SetReplyTo => ({
  type: SET_REPLY_TO,
  payload: comment,
});

export type PostsActions =
  | SetFeedPosts
  | SetMyPosts
  | SetVotedPosts
  | SetReportedPosts
  | SetCommentPost
  | SetPostComments
  | SetReplyTo;
