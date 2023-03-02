const defaulteState = {
  list: [],
};

const SET = "SET";
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const CLEAN = "CLEAN";

export const basketReducer = (state = defaulteState, action) => {
  switch (action.type) {
    case SET:
      return { ...state, list: action.payload.list };
    case ADD_ITEM:
      action.payload.time = Date.now();
      localStorage.setItem(
        `basket`,
        JSON.stringify({ ...state, list: [...state.list, action.payload] })
      );
      return { ...state, list: [...state.list, action.payload] };
    case REMOVE_ITEM:
      localStorage.setItem(
        `basket`,
        JSON.stringify({
          ...state,
          list: state.list.filter((item) => item.time !== action.payload),
        })
      );
      return {
        ...state,
        list: state.list.filter((item) => item.time !== action.payload),
      };
    case CLEAN:
      localStorage.setItem(`basket`, JSON.stringify(null));
      return { ...state, list: [] };

    default:
      return state;
  }
};

export const setAction = (payload) => ({ type: SET, payload });
export const addItemAction = (payload) => ({ type: ADD_ITEM, payload });
export const removeItemAction = (payload) => ({ type: REMOVE_ITEM, payload });
export const cleanAction = (payload) => ({ type: CLEAN, payload });
