import { createStore, combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { basketReducer } from "./basketReducer";

const rootReducer = combineReducers({
	basketReducer,
	authReducer
})

export const store = createStore(rootReducer)