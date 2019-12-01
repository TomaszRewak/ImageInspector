import React, { Component } from 'react';
import RasterImage from '../lib/RasterImage';
import Preview from './Preview';
import Layer from '../image-processing/Layer';
import Shader from '../image-processing/Shader';
import Layers from './Layers';
import '../styles/ImageInspector.css'
import Menu from './Menu';

type Props = {}
type State = {
	layers: Layer[],
	x: number,
	y: number
}

export default class ImageInspector extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);

		this.state = {
			layers: [],
			x: 0,
			y: 0
		}

		this.imageSelected = this.imageSelected.bind(this);
		this.mouseMoved = this.mouseMoved.bind(this);
	}

	private imageSelected(baseImage: RasterImage) {

		this.setState({
			layers: [
				new Layer(baseImage, Shader.identity),
				new Layer(baseImage, Shader.verticalLines)
			]
		});
	}

	private mouseMoved(x: number, y: number) {
		this.setState({ x, y });
	}

	public render(): React.ReactNode {
		return (
			<div className='image-inspector fill'>
				<Menu imageSelected={this.imageSelected} />
				<Preview layers={this.state.layers} onMouseMove={this.mouseMoved} />
				<Layers layers={this.state.layers} x={this.state.x} y={this.state.y} />
			</div>
		)
	}
}