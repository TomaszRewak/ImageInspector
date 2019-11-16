import React, { Component } from 'react';
import { ImageSelector } from './ImageSelector';
import RasterImage from '../lib/RasterImage';
import ImageViewer from './ImageViewer';
import ImageLayer from './ImageLayer';
import Parameters from './Parameters';

type Props = {}
type State = { image?: RasterImage }

export default class ImageInspector extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);

		this.state = {
			image: undefined
		}

		this._imageSelected = this._imageSelected.bind(this);
	}

	private _imageSelected(image: RasterImage) {
		this.setState({
			image
		});
	}

	public render(): React.ReactNode {
		return (
			<div>
				<ImageSelector selected={this._imageSelected} />
				{this.state.image &&
					<ImageViewer image={this.state.image} />
				}
				<Parameters />
			</div>
		)
	}
}