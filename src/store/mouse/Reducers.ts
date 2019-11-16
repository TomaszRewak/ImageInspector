import { MouseActionType } from "./Actions";
import { MouseState } from "./Types";

const initialState: MouseState = {
	isMouseOver: false,
	mouseCoordinates: { x: 0, y: 0 }
}

export function mouseReducer(state = initialState, action: MouseActionType): MouseState {
	switch (action.type) {
		case "MOUSE_MOVE":
			return { ...state, mouseCoordinates: action.payload }
		case "MOUSE_ENTER":
			return { ...state, isMouseOver: true };
		case "MOUSE_LEAVE":
			return { ...state, isMouseOver: false };
		default:
			return state;
	}
}