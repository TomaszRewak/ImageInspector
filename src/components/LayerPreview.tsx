import React, { Component } from 'react';
import Layer from '../image-processing/Layer';

type Props = {
	layer: Layer,
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
		return (
			<div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
				<canvas ref='canvas' />
			</div>
		);
	}
}