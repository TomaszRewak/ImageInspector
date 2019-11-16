import { combineReducers } from "redux";
import { mouseReducer } from "./mouse/Reducers";
import { MouseActionType } from "./mouse/Actions";

export const reducer = combineReducers({
	mouse: mouseReducer
})

export type AnyActionType = MouseActionType;
export type AppState = ReturnType<typeof reducer>;