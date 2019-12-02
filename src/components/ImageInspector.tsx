import React, { Component } from 'react';
import RasterImage from '../lib/RasterImage';
import Preview from './Preview';
import Layer from '../image-processing/Layer';
import Shader from '../image-processing/Shader';
import Layers from './Layers';
import '../styles/ImageInspector.css'
import Menu from './Menu';
import { number } from 'prop-types';

type Props = {}
type State = {
	layers: Layer[],
	selectedLayer: number,
	x: number,
	y: number,
	fullView: boolean
}

export default class ImageInspector extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);

		this.state = {
			layers: [],
			selectedLayer: 1,
			x: 0,
			y: 0,
			fullView: false
		}

		this.imageSelected = this.imageSelected.bind(this);
		this.mouseMoved = this.mouseMoved.bind(this);
		this.selected = this.selected.bind(this);
		this.toggleFullView = this.toggleFullView.bind(this);
	}

	private imageSelected(baseImage: RasterImage) {
		this.setState({
			layers: [
				new Layer(baseImage, Shader.identity),
				new Layer(baseImage, Shader.verticalLines),
				new Layer(baseImage, Shader.horizontalLines)
			]
		});
	}

	private mouseMoved(x: number, y: number) {
		this.setState({ x, y });
	}

	private selected(selectedLayer: number) {
		this.setState({ selectedLayer });
	}

	private toggleFullView() {
		this.setState(state => ({ fullView: !state.fullView }))
	}

	public render(): React.ReactNode {
		return (
			<div className='image-inspector fill'>
				<Menu imageSelected={this.imageSelected} toggleFullView={this.toggleFullView} />
				<Preview main={this.state.layers[0]} overlay={this.state.layers[this.state.selectedLayer]} onMouseMove={this.mouseMoved} fullView={this.state.fullView} />
				<Layers layers={this.state.layers} x={this.state.x} y={this.state.y} selected={this.selected} />
			</div>
		)
	}
}