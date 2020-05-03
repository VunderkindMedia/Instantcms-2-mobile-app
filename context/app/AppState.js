import React, { useReducer } from "react";
import { AppContext } from "./AppContext";
import AppReducer, { initialState } from "./AppReducer";
import { BASE_URL, API_KEY } from "../../config/consts";
import {
  GET_ICMS2_SETTINGS,
  GET_CONTENT_ITEMS,
  GET_CONTENT_ITEM,
  GET_MORE_CONTENT_ITEMS,
  SIGN_IN_LOADER,
  LOGOUT_LOADER,
  LOGIN_ERROR,
  IS_AUTH
} from "./types";

export const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const signIn = async (email, password) => {
    try {

      showSignInLoader();
      const sig_response = await fetch(
        BASE_URL + "/api/method/auth.signup_fields?api_key=" + API_KEY,
        {
          method: "POST",
          credentials: "include",
          headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },

      );
      const sig_data = await sig_response.json();
      // console.log("sig", sig_data)
      const response = await fetch(
        BASE_URL + "/api/method/auth.login?api_key=" + API_KEY + "&sig=" + sig_data.response.sig + "&email=" + email + "&password=" + password + "&remember=true",
        {
          method: "POST",
          credentials: "include",
          headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Cookie: "PHPSESSID = ddb36c1848eb28f80aa1ea4a488106e6",
          },
        }
      );
      const data = await response.json();

      hideSignInLoader();

      return data;




    } catch (e) {
      console.log("Ошибка: " + e);
      throw new Error(e);

    }
  };

  const logout = async () => {
    try {
      showLogoutLoader();
      const response = await fetch(
        BASE_URL + "/api/method/auth.logout?api_key=" + API_KEY,
        {
          method: "POST",
          credentials: "include",
          headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json',

          },
        },

      );
      const data = await response.json();
      console.log("logout", data)
      hideLogoutLoader();
    } catch (e) {
      console.log("Ошибка: " + e);
      throw new Error(e);
    }
  };

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
          body: {

          }
        }
      );
      const data = await response.json();
      console.log(response.headers);
      console.log(data.response);
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


  const showSignInLoader = () => {
    dispatch({ type: SIGN_IN_LOADER, sign_in_loading: true })
  };

  const hideSignInLoader = () => {
    dispatch({ type: SIGN_IN_LOADER, sign_in_loading: false })
  };

  const showLogoutLoader = () => {
    dispatch({ type: LOGOUT_LOADER, logout_loading: true })
  };

  const hideLogoutLoader = () => {
    dispatch({ type: LOGOUT_LOADER, logout_loading: false })
  };

  const showLoginError = (e) => {
    dispatch({ type: LOGIN_ERROR, login_error: e })
  };

  const hideLoginError = () => {
    dispatch({ type: LOGIN_ERROR, login_error: false })
  };

  const setAuth = (auth) => {
    dispatch({ type: IS_AUTH, isAuth: auth })
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
        signIn,
        logout,
        sign_in_loading: state.sign_in_loading,
        logout_loading: state.logout_loading,
        login_error: state.login_error,
        isAuth: state.isAuth,
        setAuth
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
