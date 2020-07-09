import React, { useReducer, useContext } from "react";
import { CommentsContext } from "./CommentsContext";

import CommentsReducer, { initialState } from "./CommentsReducer";
import { BASE_URL, API_KEY } from "../../config/consts";
import { COMMENTS_LIST_RESPONSE, COMMENTS_LOADER } from "./types";

export const CommentsState = ({ children }) => {
  const [state, dispatch] = useReducer(CommentsReducer, initialState);

  const getComments = async (target_controller, target_subject, target_id) => {
    showCommentsLoader();
    console.log(target_controller, target_subject, target_id);

    try {
      const response = await fetch(
        BASE_URL +
          "/api/method/comments.get?api_key=" +
          API_KEY +
          "&target_controller=" +
          target_controller +
          "&target_subject=" +
          target_subject +
          "&target_id=" +
          target_id,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      const items = assemble(data.response.items.reverse());

      data.response.items = items;

      dispatch({
        type: COMMENTS_LIST_RESPONSE,
        comments_list_response: data.response,
      });

      hideCommentsLoader();

      return data.response;
    } catch (e) {
      console.log(e);
    }
  };
  const showCommentsLoader = () => {
    dispatch({ type: COMMENTS_LOADER, commentsLoading: true });
  };

  const assemble = (arr, parentID = "0", result = []) => {
    arr.forEach((el) => {
      if (el.parent_id === parentID) {
        result.push(el);
        assemble(arr, el.id, result);
      }
    });
    return result;
  };

  const hideCommentsLoader = () => {
    dispatch({ type: COMMENTS_LOADER, commentsLoading: false });
  };

  const showSendCommentLoader = () => {
    dispatch({ type: SIGN_UP_LOADER, signUpLoading: true });
  };

  const hideSendCommentLoader = () => {
    dispatch({ type: SIGN_UP_LOADER, signUpLoading: false });
  };

  const setCommentsError = (e) => {
    dispatch({ type: SIGN_IN_ERROR, error: e });
  };

  const clearCommentsError = () => {
    dispatch({ type: SIGN_IN_ERROR, error: null });
  };
  return (
    <CommentsContext.Provider
      value={{
        commentsLoading: state.commentsLoading,
        getComments,
        comments_list_response: state.comments_list_response,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
