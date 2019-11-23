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
		const mask = `radial-gradient(ellipse 80px 80px at ${this.props.x}px ${this.props.y}px, black 60px, transparent 80px)`;

		return (
			<div style={{ position: 'absolute', top: 0 }}>
				<canvas ref='canvas' style={{
					maskImage: mask,
					WebkitMaskImage: mask
				}} />
			</div>
		);
	}
}