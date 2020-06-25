import React, { useReducer, useContext } from "react";
import { AuthContext } from "./AuthContext";

import AuthReducer, { initialState } from "./AuthReducer";
import { BASE_URL, API_KEY } from "../../config/consts";
import {
  EMAIL_IS_VALID,
  PASSWORD_IS_VALID,
  SIG,
  CSRF_TOKEN,
  SIGN_IN_ERROR,
  SIGN_IN_LOADER,
  SIGN_UP_LOADER,
  SIGN_FIELDS,
  SIGN_UP_GET_FIELDS_LOADING,
  SET_EMAIL,
  SET_PASSWORD,
  SET_SIGN_UP_REQUEST_DATA,
} from "./types";

export const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const signOut = async () => {
    try {
      const response = await fetch(
        BASE_URL + "/api/method/auth.logout?api_key=" + API_KEY,
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
      console.log("logout", data);
    } catch (e) {
      console.log("Ошибка: " + e);
      throw new Error(e);
    }
  };

  const signIn = async (data) => {
    let body = new FormData();

    Object.keys(data).forEach((key, value) => {
      console.log(key, data[key]);
      body.append(key, data[key]);
    });
    try {
      clearLoginError();
      showSignInLoader();
      const sig_response = await fetch(
        BASE_URL + "/api/method/auth.signup_fields?api_key=" + API_KEY,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const sig_data = await sig_response.json();

      const response = await fetch(
        BASE_URL +
          "/api/method/auth.login?api_key=" +
          API_KEY +
          "&sig=" +
          sig_data.response.sig +
          "&remember=true",
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: body,
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.error) {
        setLoginError(data.error.error_msg);
        return false;
      } else if (data.response) {
        return true;
      }
    } catch (e) {
      console.log("Ошибка: " + e);
      setLoginError(e);
      throw new Error(e);
    } finally {
      hideSignInLoader();
    }
  };

  const getSignFields = async () => {
    showSignUpGetFieldsInLoader();

    try {
      const sig_response = await fetch(
        BASE_URL + "/api/method/auth.signup_fields?api_key=" + API_KEY,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const fields_data = await sig_response.json();

      dispatch({ type: SIG, sig: fields_data.response.sig });
      dispatch({
        type: CSRF_TOKEN,
        csrf_token: fields_data.response.item.csrf_token.fields[0].default,
      });

      // let fields = {};
      // fields = { ...fields, ...fields_data.response.item.basic.fields };

      // Object.keys(fields_data.response.item).map(function (key, value) {
      //   if (key !== "basic" && key !== "csrf_token") {
      //     fields = { ...fields, ...fields_data.response.item[key].fields };
      //   }
      // });
      console.log(fields_data.response.item);
      dispatch({ type: SIGN_FIELDS, sign_fields: fields_data.response.item });

      hideSignUpGetFieldsInLoader();

      return fields_data.response.item;
    } catch (e) {
      console.log(e);
    }
  };
  const showSignInLoader = () => {
    dispatch({ type: SIGN_IN_LOADER, signInLoading: true });
  };

  const hideSignInLoader = () => {
    dispatch({ type: SIGN_IN_LOADER, signInLoading: false });
  };

  const showSignUpInLoader = () => {
    dispatch({ type: SIGN_UP_LOADER, signUpLoading: true });
  };

  const hideSignUpInLoader = () => {
    dispatch({ type: SIGN_UP_LOADER, signUpLoading: false });
  };

  const showSignUpGetFieldsInLoader = () => {
    dispatch({ type: SIGN_UP_GET_FIELDS_LOADING, getFieldsLoading: true });
    return state.getFieldsLoading;
  };

  const hideSignUpGetFieldsInLoader = () => {
    dispatch({ type: SIGN_UP_GET_FIELDS_LOADING, getFieldsLoading: false });
  };

  const setLoginError = (e) => {
    dispatch({ type: SIGN_IN_ERROR, error: e });
  };

  const clearLoginError = () => {
    dispatch({ type: SIGN_IN_ERROR, error: null });
  };

  const validateEmail = () => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (reg.test(state.email) === false) {
      console.log("Email не корректен");
      dispatch({
        type: EMAIL_IS_VALID,
        email_is_valid: false,
      });
      return false;
    } else {
      console.log("Email корректен");
      dispatch({ type: EMAIL_IS_VALID, email_is_valid: true });
      return true;
    }
  };

  const validatePassword = () => {
    if (String(state.password).length < 6) {
      console.log("Password is Not Correct: " + state.password);
      dispatch({ type: PASSWORD_IS_VALID, password_is_valid: false });
      return false;
    } else {
      console.log("Password is Correct");
      dispatch({ type: PASSWORD_IS_VALID, password_is_valid: true });
      return true;
    }
  };

  const setEmail = (email) => {
    dispatch({ type: SET_EMAIL, email });
  };

  const setPassword = (password) => {
    dispatch({ type: SET_PASSWORD, password });
  };

  const setSignUpRequestData = (data) => {
    dispatch({
      type: SET_SIGN_UP_REQUEST_DATA,
      signUpRequestData: { ...state.signUpRequestData, ...data },
    });
    console.log("DATA " + data);
  };
  return (
    <AuthContext.Provider
      value={{
        email: state.email,
        password: state.password,
        email_is_valid: state.email_is_valid,
        password_is_valid: state.password_is_valid,
        error: state.error,
        signInLoading: state.signInLoading,
        signIn,
        signOut,
        validateEmail,
        validatePassword,
        setEmail,
        setPassword,
        sign_fields: state.sign_fields,
        getSignFields,
        setSignUpRequestData,
        signUpRequestData: state.signUpRequestData,
        getFieldsLoading: state.getFieldsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
