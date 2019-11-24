import React, { Component } from 'react';
import Layer from '../image-processing/Layer';

type Props = {
	layer: Layer,
	x: number,
	y: number
}
type State = {}

export default class LayerPreview extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		this.updateCanvas();
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.layer != this.props.layer)
			this.updateCanvas();
	}

	private updateCanvas() {
		this.props.layer.draw(this.refs.canvas as HTMLCanvasElement);
	}

	public render(): React.ReactNode {
		const mask = `circle(50px at ${this.props.x}px ${this.props.y}px)`;

		return (
			<div style={{ position: 'absolute', top: 0, pointerEvents: 'none' }}>
				<canvas ref='canvas' style={{
					clipPath: mask,
					WebkitClipPath: mask
				}} />
				<svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
					<circle cx={this.props.x} cy={this.props.y} r='50' stroke='red' fill='transparent' strokeWidth='3' />
					<line x1={this.props.x - 5} x2={this.props.x + 5} y1={this.props.y} y2={this.props.y} stroke='red' strokeWidth='1px' />
					<line x1={this.props.x} x2={this.props.x} y1={this.props.y - 5} y2={this.props.y + 5} stroke='red' strokeWidth='1px' />
				</svg>
			</div>
		);
	}
}