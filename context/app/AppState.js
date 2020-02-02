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
  CLEAR_CONTENT_ITEMS
} from "./types";

export const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

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
  const get_items_list = async ctype => {
    showLoader();
    clearContentItems();
    clearError();
    try {
      const response = await fetch(
        BASE_URL + "/api/method/content.get." + ctype + "?api_key=" + API_KEY,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const data = await response.json();

      dispatch({ type: GET_CONTENT_ITEMS, itemsList: data.response });
    } catch (e) {
      showError();
      console.log(e);
    } finally {
      hideLoader();
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
      console.log("asdgsdgsdg" + data.response);
      dispatch({ type: GET_CONTENT_ITEM, item_res: data.response });
    } catch (e) {
      showError();
      hideLoader();
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
        showLoader,
        hideLoader,
        get_icms2_settings,
        get_items_list,
        get_item,
        itemsList: state.itemsList,
        item_res: state.item_res
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
