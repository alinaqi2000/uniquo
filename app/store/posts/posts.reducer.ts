import { Category } from "../../models/Category";
import { Post } from "../../models/Post";
import { PostComment } from "../../models/PostComment";
import { PostMedia } from "../../models/PostMedia";
import { User } from "../../models/User";
import {
  PostsActions,
  SET_MY_POSTS,
  SET_REPORTED_POSTS,
  SET_FEED_POSTS,
  SET_COMMENT_POST,
  SET_POST_COMMENTS,
  SET_REPLY_TO,
  SET_VOTED_POSTS,
  PAUSE_ALL_VIDEOS,
  SET_WINNER_POSTS,
} from "./posts.actions";

export interface PostsState {
  feed: Post[];
  my: Post[];
  voted: Post[];
  winner: Post[];
  reported: Post[];
  commentPost: Post | null;
  postComments: PostComment[];
  replyTo: PostComment | null;
  pauseAllVideos: boolean;
}
const initialState: PostsState = {
  feed: [],
  voted: [],
  my: [],
  winner: [],
  reported: [],
  commentPost: null,
  postComments: [],
  replyTo: null,
  pauseAllVideos: true,
};

export default (state = initialState, action: PostsActions): PostsState => {
  switch (action.type) {
    case SET_FEED_POSTS:
      return {
        ...state,
        feed: action.payload,
      };
    case SET_MY_POSTS:
      return {
        ...state,
        my: action.payload,
      };
    case SET_WINNER_POSTS:
      return {
        ...state,
        winner: action.payload,
      };
    case SET_VOTED_POSTS:
      return {
        ...state,
        voted: action.payload,
      };
    case SET_REPORTED_POSTS:
      return {
        ...state,
        reported: action.payload,
      };
    case SET_COMMENT_POST:
      return {
        ...state,
        commentPost: action.payload,
      };
    case SET_POST_COMMENTS:
      return {
        ...state,
        postComments: action.payload,
      };
    case SET_REPLY_TO:
      return {
        ...state,
        replyTo: action.payload,
      };
    case PAUSE_ALL_VIDEOS:
      return {
        ...state,
        pauseAllVideos: !state.pauseAllVideos,
      };
    default:
      return state;
  }
};
