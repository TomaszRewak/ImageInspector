import React, { Component, MouseEvent } from 'react';
import RasterImage from '../lib/RasterImage';
import Layer from '../image-processing/Layer';
import { throwError } from '../utils/exceptions';
import Shader from '../image-processing/Shader';

type Props = {
	baseImage: RasterImage
};
type State = {
	mouseLeft: number,
	mouseTop: number,
};

export default class ImageLayer extends Component<Props, State>
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

	componentDidUpdate() {
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
		console.log('Optimize');

		const image = this.refs.canvas as HTMLCanvasElement;
		image.width = this.props.baseImage.width;
		image.height = this.props.baseImage.height;

		const context = image.getContext('webgl') || throwError<WebGLRenderingContext>('Browser not supported');

		const layer = new Layer(context, Shader.default);
		layer.transform(this.props.baseImage.imageData);
		layer.dispose();
	}

	public render(): React.ReactNode {
		const mask = `radial-gradient(ellipse 80px 80px at ${this.state.mouseLeft}px ${this.state.mouseTop}px, black 60px, transparent 80px)`;

		return (
			<div style={{ position: 'absolute', top: 0 }} onMouseMove={this.mouseMoved}>
				<canvas ref='canvas' style={{
					maxWidth: 500,
					maskImage: mask,
					WebkitMaskImage: mask
				}} />
			</div>
		);
	}
}