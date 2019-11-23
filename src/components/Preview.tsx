import React, { Component, MouseEvent } from 'react'
import RasterImage from '../lib/RasterImage';
import BaseImage from './BaseImage';
import LayerPreview from './LayerPreview';
import Layer from '../image-processing/Layer';

type Props = {
	image: RasterImage,
	layers: Layer[],
	onMouseMove?: (x: number, y: number) => void
}
type State = {
	x: number,
	y: number
}

export default class Preview extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);

		this.state = {
			x: 0,
			y: 0
		};

		this.mouseMoved = this.mouseMoved.bind(this);
	}

	private mouseMoved(event: MouseEvent) {
		console.log(Date.now())
		this.setState({
			x: event.clientX,
			y: event.clientY
		})

		if (this.props.onMouseMove)
			this.props.onMouseMove(event.clientX, event.clientY);
	}

	public render(): React.ReactNode {
		return (
			<div style={{ position: 'relative' }} onMouseMove={this.mouseMoved}>
				<BaseImage source={this.props.image.url} />
				{
					this.props.layers.map((layer, key) => <LayerPreview key={key} layer={layer} x={this.state.x} y={this.state.y} />)
				}
			</div>
		);
	}
}