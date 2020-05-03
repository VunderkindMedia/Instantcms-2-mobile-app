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

export const initialState = {
  settings: {},
  itemsList: [],
  additionally: {},
  ctype_title: "",
  paging: {},
  item_res: {},
  sign_in_loading: false,
  logout_loading: false,
  login_error: null,
  isAuth: false
};

export default function AppReducer(state, action) {
  switch (action.type) {
    case GET_ICMS2_SETTINGS:
      return { ...state, settings: action.settings };
    case GET_CONTENT_ITEMS:
      return {
        ...state,
        itemsList: action.itemsList,
        additionally: { ...action.additionally },
        ctype_title: action.ctype_title,
        paging: { ...action.paging },
      };
    case GET_MORE_CONTENT_ITEMS:
      return {
        ...state,
        itemsList: [...state.itemsList, ...action.itemsList],
        additionally: { ...action.additionally },
        ctype_title: action.ctype_title,
        paging: { ...action.paging },
      };
    case GET_CONTENT_ITEM:
      return { ...state, item_res: action.item_res };
    case SIGN_IN_LOADER:
      return { ...state, sign_in_loading: action.sign_in_loading };
    case LOGOUT_LOADER:
      return { ...state, logout_loading: action.logout_loading };
    case LOGIN_ERROR:
      return { ...state, login_error: action.login_error };
    case IS_AUTH:
      return { ...state, isAuth: action.isAuth };
    default:
      return state;
  }
}
