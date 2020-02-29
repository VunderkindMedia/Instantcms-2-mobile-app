import React, { useReducer, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";
import AppReducer, { initialState } from "./AppReducer";
import { BASE_URL, API_KEY } from "../../config/consts";
import {
  SHOW_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
  CLEAR_ERROR,
  GET_ICMS2_SETTINGS,
  GET_CONTENT_ITEMS,
  GET_CONTENT_ITEM,
  CLEAR_CONTENT_ITEMS,
  GET_MORE_CONTENT_ITEMS,
  SHOW_REFRESH_LOADER,
  HIDE_REFRESH_LOADER,
  SHOW_LAZY_LOADER,
  HIDE_LAZY_LOADER
} from "./types";

export const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showRefreshLoader = () => dispatch({ type: SHOW_REFRESH_LOADER });

  const hideRefreshLoader = () => dispatch({ type: HIDE_REFRESH_LOADER });

  const showLazyLoader = () => dispatch({ type: SHOW_LAZY_LOADER });

  const hideLazyLoader = () => dispatch({ type: HIDE_LAZY_LOADER });

  const showError = error => dispatch({ type: SHOW_ERROR, error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });
  const clearContentItems = () => dispatch({ type: CLEAR_CONTENT_ITEMS });

  const get_icms2_settings = async () => {
    clearError();
    try {
      const response = await fetch(
        BASE_URL + "/api/method/api.settingsget.php?api_key=" + API_KEY,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const data = await response.json();
      dispatch({ type: GET_ICMS2_SETTINGS, settings: data.response });
    } catch (e) {
      showError();
      console.log("Ошибка: " + e);
    }
  };

  //CONTENT
  const get_items_list = async (ctype, page) => {
    var url;

    if (page) {
      url =
        BASE_URL +
        "/api/method/content.get." +
        ctype +
        "?api_key=" +
        API_KEY +
        "&page=" +
        page;
    } else {
      url =
        BASE_URL + "/api/method/content.get." + ctype + "?api_key=" + API_KEY;
    }
    // if (!page && !refresh) {
    //   showLoader();
    // }

    clearError();
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();

      if (page > 1) {
        dispatch({
          type: GET_MORE_CONTENT_ITEMS,
          itemsList: data.response.items,
          additionally: data.response.additionally,
          ctype_title: data.response.ctype_title,
          paging: data.response.paging
        });
      } else {
        dispatch({
          type: GET_CONTENT_ITEMS,
          itemsList: data.response.items,
          additionally: data.response.additionally,
          ctype_title: data.response.ctype_title,
          paging: data.response.paging
        });
      }
    } catch (e) {
      showError();
      console.log(e);
    }
  };

  const get_item = async (ctype, item_id) => {
    clearError();
    showLoader();

    try {
      const response = await fetch(
        BASE_URL +
          "/api/method/content.get_item." +
          ctype +
          "?api_key=" +
          API_KEY +
          "&item_id=" +
          item_id,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const data = await response.json();
      dispatch({ type: GET_CONTENT_ITEM, item_res: data.response });
    } catch (e) {
      showError();

      console.log(e);
    } finally {
      hideLoader();
    }
  };

  return (
    <AppContext.Provider
      value={{
        settings: state.settings,
        loading: state.loading,
        error: state.error,
        lazy: state.lazy,
        showLoader,
        hideLoader,
        showError,
        get_icms2_settings,
        get_items_list,
        get_item,
        showRefreshLoader,
        showLazyLoader,
        itemsList: state.itemsList,
        additionally: state.additionally,
        paging: state.paging,
        ctype_title: state.ctype_title,
        item_res: state.item_res,
        reaching: state.reaching
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
