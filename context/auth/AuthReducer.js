import {
  SIGN_IN_ERROR,
  SIGN_IN_LOADER,
  SIGN_UP_LOADER,
  SET_EMAIL,
  SET_PASSWORD,
  EMAIL_IS_VALID,
  PASSWORD_IS_VALID,
  SIG,
  CSRF_TOKEN,
  SIGN_FIELDS,
  SIGN_UP_GET_FIELDS_LOADING,
  SET_SIGN_UP_REQUEST_DATA,
} from "./types";

export const initialState = {
  email: "",
  password: "",
  signInLoading: false,
  getFieldsLoading: true,
  email_is_valid: true,
  password_is_valid: true,
  error: null,
  sig: null,
  csrf_token: null,
  sign_fields: {},
  signUpRequestData: {},
};

export default function AppReducer(state, action) {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.email };
    case SET_PASSWORD:
      return { ...state, password: action.password };
    case SIG:
      return { ...state, sig: action.sig };
    case CSRF_TOKEN:
      return { ...state, csrf_token: action.csrf_token };
    case SIGN_FIELDS:
      return { ...state, sign_fields: action.sign_fields };
    case SIGN_IN_LOADER:
      return { ...state, signInLoading: action.signInLoading };
    case SIGN_UP_LOADER:
      return { ...state, signUpLoading: action.signIpLoading };
    case SIGN_UP_GET_FIELDS_LOADING:
      return { ...state, getFieldsLoading: action.getFieldsLoading };
    case SIGN_IN_ERROR:
      return { ...state, error: action.error };
    case EMAIL_IS_VALID:
      return { ...state, email_is_valid: action.email_is_valid };
    case PASSWORD_IS_VALID:
      return { ...state, password_is_valid: action.password_is_valid };
    case SET_SIGN_UP_REQUEST_DATA:
      return { ...state, signUpRequestData: action.signUpRequestData };
    default:
      return state;
  }
}
