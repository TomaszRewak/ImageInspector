import React from "react";
import '../styles/Crosshair.css'

export default function Crosshair(props: { x: number, y: number }) {
	return (
		<svg className='crosshair' style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
			<rect x={props.x - 4} y={props.y} width={4} height={1} />
			<rect x={props.x + 1} y={props.y} width={4} height={1} />
			<rect x={props.x} y={props.y - 4} width={1} height={4} />
			<rect x={props.x} y={props.y + 1} width={1} height={4} />
		</svg>
	);
}