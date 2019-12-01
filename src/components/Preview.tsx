import React, { Component, MouseEvent } from 'react'
import RasterImage from '../lib/RasterImage';
import LayerPreview from './LayerPreview';
import Layer from '../image-processing/Layer';
import Crosshair from './Crosshair';
import '../styles/Preview.css'

type Props = {
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
		var rect = (event.target as any).getBoundingClientRect();
		var x = event.clientX - rect.left;
		var y = event.clientY - rect.top;

		this.setState({ x, y })

		if (this.props.onMouseMove)
			this.props.onMouseMove(x, y);

		event.stopPropagation();
		event.preventDefault();
	}

	public render(): React.ReactNode {
		if (this.props.layers.length == 0) return <div className='Preview' />

		const mask = `circle(50px at ${this.state.x}px ${this.state.y}px)`;
		const mainLayer = this.props.layers[0];

		return (
			<div className='preview' >
				<div style={{ position: 'relative', cursor: 'none', width: mainLayer.width, height: mainLayer.height }} onMouseMove={this.mouseMoved}>
					<LayerPreview layer={mainLayer} />)
					<div style={{ clipPath: mask, WebkitClipPath: mask, position: 'absolute', left: 0, top: 0 }}>
						{
							this.props.layers.slice(1).map((layer, key) => <LayerPreview key={key} layer={layer} />)
						}
					</div>
					<Crosshair x={this.state.x} y={this.state.y} />
				</div>
			</div>
		);
	}
}