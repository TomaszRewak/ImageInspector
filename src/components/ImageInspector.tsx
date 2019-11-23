import React, { Component } from 'react';
import { ImageSelector } from './ImageSelector';
import RasterImage from '../lib/RasterImage';
import Preview from './Preview';
import Layer from '../image-processing/Layer';
import Shader from '../image-processing/Shader';
import Layers from './Layers';

type Props = {}
type State = {
	baseImage?: RasterImage,
	layers: Layer[],
	x: number,
	y: number
}

export default class ImageInspector extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);

		this.state = {
			baseImage: undefined,
			layers: [],
			x: 0,
			y: 0
		}

		this.imageSelected = this.imageSelected.bind(this);
		this.mouseMoved = this.mouseMoved.bind(this);
	}

	private imageSelected(baseImage: RasterImage) {
		const layer = new Layer();
		layer.link(Shader.default);
		layer.load(baseImage);

		this.setState({
			baseImage,
			layers: [
				layer
			]
		});
	}

	private mouseMoved(x: number, y: number) {
		this.setState({ x, y });
	}

	public render(): React.ReactNode {
		return (
			<div>
				<ImageSelector selected={this.imageSelected} />
				{this.state.baseImage &&
					<Preview image={this.state.baseImage} layers={this.state.layers} onMouseMove={this.mouseMoved} />
				}
				<Layers layers={this.state.layers} x={this.state.x} y={this.state.y} />
			</div>
		)
	}
}