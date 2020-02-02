import {
  GET_ICMS2_SETTINGS,
  SHOW_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  HIDE_LOADER,
  GET_CONTENT_ITEMS,
  GET_CONTENT_ITEM,
  CLEAR_CONTENT_ITEMS,
  CLEAR_CONTENT_ITEM
} from "./types";

export const initialState = {
  settings: {},
  itemsList: {},
  item_res: {},
  loading: true,
  error: null
};

export default function AppReducer(state, action) {
  switch (action.type) {
    case GET_ICMS2_SETTINGS:
      return { ...state, settings: action.settings };
    case GET_CONTENT_ITEMS:
      return { ...state, itemsList: action.itemsList };
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
    default:
      return state;
  }
}
