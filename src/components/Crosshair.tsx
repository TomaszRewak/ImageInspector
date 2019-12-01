import React from "react";

export default function Crosshair(props: { x: number, y: number }) {
	return (
		<svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
			<circle cx={props.x} cy={props.y} r='50' stroke='rgba(0, 0, 0, 0.3)' strokeDasharray='3.14' fill='transparent' strokeWidth='1' />
			<line x1={props.x - 4.5} x2={props.x - 0.5} y1={props.y + 0.5} y2={props.y + 0.5} stroke='red' strokeWidth='1px' />
			<line x1={props.x + 1.5} x2={props.x + 5.5} y1={props.y + 0.5} y2={props.y + 0.5} stroke='red' strokeWidth='1px' />
			<line x1={props.x + 0.5} x2={props.x + 0.5} y1={props.y - 4.5} y2={props.y - 0.5} stroke='red' strokeWidth='1px' />
			<line x1={props.x + 0.5} x2={props.x + 0.5} y1={props.y + 1.5} y2={props.y + 5.5} stroke='red' strokeWidth='1px' />
		</svg>
	);
}