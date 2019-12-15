import React from "react";
import '../styles/Crosshair.css'

export default function Crosshair(props: { x: number, y: number }) {
	return (
		<svg className='crosshair' style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
			<rect x={0} y={props.y} width='100%' height={1} />
			<rect x={props.x} y={0} width={1} height='100%' />
		</svg>
	);
}