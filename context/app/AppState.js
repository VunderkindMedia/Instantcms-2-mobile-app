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
  UPLOAD_ERROR,
  THEME,
} from "./types";
import { ThemeConsumer } from "react-native-elements";

import { Appearance, useColorScheme } from "react-native-appearance";

export const AppState = ({ children }) => {
  const systemTheme = useColorScheme();
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getLocalTheme = async () => {
    try {
      AsyncStorage.getItem("theme").then((local_theme) => {
        AsyncStorage.getItem("numOfSwitch").then((numOfSwitch) => {
          if (local_theme !== null) {
            if (numOfSwitch !== "3") {
              setTheme(numOfSwitch, local_theme);
            } else {
              setTheme(numOfSwitch, systemTheme);
            }
          } else {
            setTheme("1", "dark");
          }
          console.log("THEME LOCAL", local_theme);
        });
      });
    } catch (e) {
      console.log(e);
    }

    return;
  };

  useEffect(() => {
    getLocalTheme();
  }, [systemTheme]);

  const get_icms2_settings = async () => {
    try {
      const response = await fetch(
        BASE_URL + "/api/method/mobileapp.settings.php?api_key=" + API_KEY,
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
      console.log(data);

      dispatch({ type: GET_ICMS2_SETTINGS, settings: data.response });
      return data.response;
    } catch (e) {
      console.log("Ошибка: " + e);
      throw new Error(e);
    }
  };

  const send_token = async (token) => {
    try {
      const response = await fetch(
        BASE_URL +
          "/api/method/mobileapp.add_notification_token.php?api_key=" +
          API_KEY +
          "&token=" +
          token,
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

      console.log("NOTIFICATION_TOKEN", data);
      return data.response;
    } catch (e) {
      console.log("Ошибка: " + e);
      throw new Error(e);
    }
  };

  const upload_photo = async (photoUri) => {
    let body = new FormData();

    body.append("photo", { uri: photoUri, type: "image/jpg", name: photoUri });

    try {
      clearUploadError();
      const response = await fetch(
        BASE_URL +
          "/api/method/images.upload?api_key=" +
          API_KEY +
          "&name=photo",
        {
          method: "POST",
          credentials: "some-original",

          body: body,
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.response) {
        return data.response;
      } else if (data.error) {
        setUploadError(data.error.error_msg);
      }
    } catch (e) {
      console.log("Ошибка: " + e);
      throw new Error(e);
    }
  };

  const setUploadError = (e) => {
    dispatch({ type: UPLOAD_ERROR, upload_error: e });
  };

  const clearUploadError = () => {
    dispatch({ type: UPLOAD_ERROR, upload_error: null });
  };

  const get_items_list = async (ctype, page, filter = {}) => {
    let url = BASE_URL + "/api/method/mobileapp.get_content_list." + ctype;

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

      console.log(data);
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

  const setTheme = async (numOfSwitch, theme) => {
    try {
      await AsyncStorage.setItem("theme", theme);
      await AsyncStorage.setItem("numOfSwitch", numOfSwitch);
      console.log(state.theme);
      dispatch({
        type: THEME,
        theme: { value: theme, numOfSwitch: numOfSwitch },
      });
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
        theme: state.theme.value,
        systemTheme: systemTheme,
        numThemeSwitch: state.theme.numOfSwitch,
        setTheme,
        reload,
        upload_photo,
        send_token,
        upload_error: state.upload_error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
