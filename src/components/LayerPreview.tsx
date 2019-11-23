import React, { Component, MouseEvent } from 'react';
import Layer from '../image-processing/Layer';

type Props = {
	layer: Layer
};
type State = {
	mouseLeft: number,
	mouseTop: number,
};

export default class LayerPreview extends Component<Props, State>
{
	state = {
		mouseLeft: 0,
		mouseTop: 0
	};

	public constructor(props: Props) {
		super(props);

		this.mouseMoved = this.mouseMoved.bind(this);
	}

	componentDidMount() {
		this.updateCanvas();
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.layer != this.props.layer)
			this.updateCanvas();
	}

	private mouseMoved(event: MouseEvent) {
		console.log(Date.now())
		this.setState({
			mouseLeft: event.clientX,
			mouseTop: event.clientY
		})
	}

	private updateCanvas() {
		this.props.layer.draw(this.refs.canvas as HTMLCanvasElement);
	}

	public render(): React.ReactNode {
		const mask = `radial-gradient(ellipse 80px 80px at ${this.state.mouseLeft}px ${this.state.mouseTop}px, black 60px, transparent 80px)`;

		return (
			<div style={{ position: 'absolute', top: 0 }} onMouseMove={this.mouseMoved}>
				<canvas ref='canvas' style={{
					maskImage: mask,
					WebkitMaskImage: mask
				}} />
			</div>
		);
	}
}