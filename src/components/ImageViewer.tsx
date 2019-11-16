import React, { Component } from 'react'
import RasterImage from '../lib/RasterImage';
import ImagePreview from './ImagePreview';
import ImageLayer from './ImageLayer';

type Props = { image: RasterImage }
type State = {}

export default class ImageViewer extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);
	}

	public render(): React.ReactNode {
		return (
			<div style={{ position: 'relative' }}>
				<ImagePreview source={this.props.image.url} />
				<ImageLayer baseImage={this.props.image} />
			</div>
		);
	}
}