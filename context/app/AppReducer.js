import {
  GET_ICMS2_SETTINGS,
  SHOW_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  HIDE_LOADER,
  GET_CONTENT_ITEMS,
  GET_CONTENT_ITEM,
  CLEAR_CONTENT_ITEMS,
  CLEAR_CONTENT_ITEM,
  GET_MORE_CONTENT_ITEMS,
  SHOW_REFRESH_LOADER,
  HIDE_REFRESH_LOADER,
  SHOW_LAZY_LOADER,
  HIDE_LAZY_LOADER
} from "./types";

export const initialState = {
  settings: {},
  itemsList: [],
  reaching: false,
  additionally: {},
  ctype_title: "",
  paging: {},
  item_res: {},
  lazy: false,
  loading: true,
  error: null
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
        paging: { ...action.paging }
      };
    case GET_MORE_CONTENT_ITEMS:
      return {
        ...state,
        itemsList: [...state.itemsList, ...action.itemsList],
        additionally: { ...action.additionally },
        ctype_title: action.ctype_title,
        paging: { ...action.paging }
      };
    case CLEAR_CONTENT_ITEMS:
      return { ...state, itemsList: {} };
    case CLEAR_CONTENT_ITEM:
      return { ...state, item: {} };
    case GET_CONTENT_ITEM:
      return { ...state, item_res: action.item_res };
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    case SHOW_ERROR:
      return { ...state, error: true };
    case CLEAR_ERROR:
      return { ...state, error: false };
    case SHOW_REFRESH_LOADER:
      return { ...state, reaching: true };
    case HIDE_REFRESH_LOADER:
      return { ...state, reaching: false };
    case SHOW_LAZY_LOADER:
      return { ...state, lazy: true };
    case HIDE_LAZY_LOADER:
      return { ...state, lazy: false };
    default:
      return state;
  }
}
