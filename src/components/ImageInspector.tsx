import React, { Component } from 'react';
import { ImageSelector } from './ImageSelector';
import RasterImage from '../lib/RasterImage';
import ImageViewer from './ImageViewer';
import ImageLayer from './ImageLayer';

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
				<div style={{ position: 'relative' }}>
					{this.state.image &&
						<ImageViewer source={this.state.image.url} />
					}
					{this.state.image &&
						<ImageLayer baseImage={this.state.image} />
					}
				</div>
			</div>
		)
	}
}