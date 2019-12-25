import React, { Component } from 'react'
import '../styles/Menu.css'
import RasterImage from '../lib/RasterImage';
import Shader from '../image-processing/Shader';
import { deserializeShaders, serializeShaders } from '../lib/ShadersSerialization';
import loadFileContent from '../lib/FileLoader';
import loadImage from '../lib/ImageLoader';
import Layer from '../image-processing/Layer';

type Props = {
	imageSelected: (image: RasterImage) => void,
	shadersSelected: (shaders: Shader[]) => void,
	layers: Layer[]
}
type State = {}

export default class Menu extends Component<Props, State>
{
	private _imageSelected = (event: React.FormEvent<HTMLInputElement>) => {
		if (event.currentTarget.files == null) throw Error("No file selected");
		loadImage(event.currentTarget.files[0]).then(this.props.imageSelected);
	}

	private _shadersSelected = (event: React.FormEvent<HTMLInputElement>) => {
		if (event.currentTarget.files == null) throw Error("No file selected");
		loadFileContent(event.currentTarget.files[0]).then((content) => this.props.shadersSelected(deserializeShaders(content)));
	}

	private _clrearFile = (event: React.MouseEvent<HTMLInputElement>) => {
		const target: any = event.target;
		target.value = '';
	}

	public render() {
		const download = URL.createObjectURL(new Blob([serializeShaders(this.props.layers.map(layer => layer.shader))], { type: 'text/plain' }));

		return (
			<div className='menu'>
				<div className="file-form">
					<label htmlFor="hidden-image-button">
						Load image
					</label>
					<input type="file" id="hidden-image-button" onChange={this._imageSelected} style={{ display: 'none' }} onClick={this._clrearFile} />
				</div>
				<div className="file-form">
					<label htmlFor="hidden-layers-button">
						Open layers
					</label>
					<input type="file" id="hidden-layers-button" onChange={this._shadersSelected} style={{ display: 'none' }} onClick={this._clrearFile} />
				</div>
				<a href={download} download='layers.json'>Save layers</a>
			</div>
		);
	}
}