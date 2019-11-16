import { combineReducers } from "redux";
import { mouseReducer } from "./mouse/Reducers";

const reducer = combineReducers({
	mouse: mouseReducer
})

export type AppState = ReturnType<typeof reducer>;