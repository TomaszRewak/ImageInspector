export type MouseState = {
	isMouseOver: boolean,
	mouseCoordinates: MouseCoordinates
}

export interface MouseCoordinates {
	x: number;
	y: number;
}