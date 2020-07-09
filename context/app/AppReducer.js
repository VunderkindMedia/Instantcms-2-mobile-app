import {
  GET_ICMS2_SETTINGS,
  GET_CONTENT_ITEMS,
  GET_CONTENT_ITEM,
  GET_MORE_CONTENT_ITEMS,
  RELOAD,
  UPLOAD_ERROR,
  THEME,
} from "./types";

import AsyncStorage from "@react-native-community/async-storage";

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
  isAuth: false,
  theme: "light",
  upload_error: null,
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
    case RELOAD:
      return { ...state, rel: !state.rel };
    case THEME:
      return { ...state, theme: action.theme };
    case UPLOAD_ERROR:
      return { ...state, upload_error: action.upload_error };
    default:
      return state;
  }
}
