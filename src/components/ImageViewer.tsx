import React, { Component, MouseEvent } from 'react'
import RasterImage from '../lib/RasterImage';
import ImagePreview from './ImagePreview';
import ImageLayer from './ImageLayer';

type Props = { image: RasterImage }
type State = {}

export default class ImageViewer extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);

		this.mouseMoved = this.mouseMoved.bind(this);
	}

	private mouseMoved(event: MouseEvent) {
		console.log(Date.now())
		this.setState({
			mouseLeft: event.clientX,
			mouseTop: event.clientY
		})
	}

	public render(): React.ReactNode {
		return (
			<div style={{ position: 'relative' }} onMouseMove={this.mouseMoved}>
				<ImagePreview source={this.props.image.url} />
				<ImageLayer baseImage={this.props.image} />
			</div>
		);
	}
}