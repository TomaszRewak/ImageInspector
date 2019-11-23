import React, { Component } from 'react'
import RasterImage from '../lib/RasterImage';
import BaseImage from './BaseImage';
import LayerPreview from './LayerPreview';
import Layer from '../image-processing/Layer';

type Props = {
	image: RasterImage
	layers: Layer[]
}
type State = {}

export default class Preview extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);
	}

	public render(): React.ReactNode {
		return (
			<div style={{ position: 'relative' }}>
				<BaseImage source={this.props.image.url} />
				{
					this.props.layers.map((layer, key) => <LayerPreview key={key} layer={layer} />)
				}
			</div>
		);
	}
}