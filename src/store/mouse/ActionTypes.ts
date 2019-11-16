import { MouseCoordinates } from "./Types";

export const MOUSE_MOVE = 'MOUSE_MOVE';
export interface MoveMouseAction {
	type: typeof MOUSE_MOVE
	payload: MouseCoordinates
}

export const MOUSE_ENTER = 'MOUSE_ENTER';
export interface MouseEnterAction {
	type: typeof MOUSE_ENTER
}

export const MOUSE_LEAVE = 'MOUSE_LEAVE';
export interface MouseLeaveAction {
	type: typeof MOUSE_LEAVE
}