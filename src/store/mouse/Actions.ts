import { MoveMouseAction, MouseEnterAction, MouseLeaveAction, MOUSE_MOVE, MOUSE_LEAVE, MOUSE_ENTER } from './ActionTypes';

export type MouseActionType = MoveMouseAction | MouseEnterAction | MouseLeaveAction;

export function moveMouse(x: number, y: number): MouseActionType {
	return {
		type: MOUSE_MOVE,
		payload: { x, y }
	}
}

export function mouseLeft(): MouseActionType {
	return {
		type: MOUSE_LEAVE
	}
}

export function mouseEntered(): MouseActionType {
	return {
		type: MOUSE_ENTER
	}
}