import React, { useReducer, useEffect } from "react";
import { AppContext } from "./AppContext";
import AppReducer, { initialState } from "./AppReducer";
import { BASE_URL, API_KEY } from "../../config/consts";
import AsyncStorage from "@react-native-community/async-storage";
import {
  GET_ICMS2_SETTINGS,
  GET_CONTENT_ITEMS,
  GET_CONTENT_ITEM,
  GET_MORE_CONTENT_ITEMS,
  RELOAD,
  THEME,
} from "./types";
import { ThemeConsumer } from "react-native-elements";

export const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getLocalTheme = async () => {
    const local_theme = await AsyncStorage.getItem("theme");
    console.log(local_theme);

    setTheme(local_theme);
    return;
  };

  useEffect(() => {
    getLocalTheme();
  }, []);

  const get_icms2_settings = async () => {
    try {
      const response = await fetch(
        BASE_URL + "/api/method/api.settingsget.php?api_key=" + API_KEY,
        {
          method: "POST",
          credentials: "some-original",
          headers: {
            "Content-Type": "application/json",
          },
          body: {},
        }
      );
      const data = await response.json();

      dispatch({ type: GET_ICMS2_SETTINGS, settings: data.response });
    } catch (e) {
      console.log("Ошибка: " + e);
      throw new Error(e);
    }
  };

  const get_items_list = async (ctype, page, filter = {}) => {
    let url = BASE_URL + "/api/method/content.get." + ctype;

    const form = new FormData();
    form.append("api_key", API_KEY);

    if (filter)
      for (let [key, value] of Object.entries(filter)) {
        form.append(key, value);
      }

    if (page) {
      form.append("page", page);
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (page > 1) {
        dispatch({
          type: GET_MORE_CONTENT_ITEMS,
          itemsList: data.response.items,
          additionally: data.response.additionally,
          ctype_title: data.response.ctype_title,
          paging: data.response.paging,
        });
      } else {
        dispatch({
          type: GET_CONTENT_ITEMS,
          itemsList: data.response.items,
          additionally: data.response.additionally,
          ctype_title: data.response.ctype_title,
          paging: data.response.paging,
        });
      }
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

  const get_item = async (ctype, item_id) => {
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
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      dispatch({ type: GET_CONTENT_ITEM, item_res: data.response });
    } catch (e) {
      console.log(e);
    }
  };

  const reload = () => {
    dispatch({ type: RELOAD });
  };

  const setTheme = async (theme) => {
    try {
      await AsyncStorage.setItem("theme", theme);
      console.log(state.theme);
      dispatch({ type: THEME, theme: theme });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        settings: state.settings,
        get_icms2_settings,
        get_items_list,
        get_item,
        itemsList: state.itemsList,
        additionally: state.additionally,
        paging: state.paging,
        ctype_title: state.ctype_title,
        item_res: state.item_res,
        rel: state.rel,
        theme: state.theme,
        setTheme,
        reload,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
