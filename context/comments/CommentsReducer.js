import { COMMENTS_LIST_RESPONSE, COMMENTS_LOADER } from "./types";

export const initialState = {
  comments_list_response: {},
  commentsLoading: true,
};

export default function CommentsReducer(state, action) {
  switch (action.type) {
    case COMMENTS_LIST_RESPONSE:
      return {
        ...state,
        comments_list_response: action.comments_list_response,
      };
    case COMMENTS_LOADER:
      return {
        ...state,
        commentsLoading: action.commentsLoading,
      };

    default:
      return state;
  }
}
