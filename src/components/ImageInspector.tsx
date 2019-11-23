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
	layers: Layer[]
}

export default class ImageInspector extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);

		this.state = {
			baseImage: undefined,
			layers: []
		}

		this._imageSelected = this._imageSelected.bind(this);
	}

	private _imageSelected(baseImage: RasterImage) {
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

	public render(): React.ReactNode {
		return (
			<div>
				<ImageSelector selected={this._imageSelected} />
				{this.state.baseImage &&
					<Preview image={this.state.baseImage} layers={this.state.layers} />
				}
				<Layers layers={this.state.layers} x={10} y={10}/>
			</div>
		)
	}
}