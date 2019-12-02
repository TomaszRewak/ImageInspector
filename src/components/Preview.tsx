import React, { Component, MouseEvent } from 'react'
import RasterImage from '../lib/RasterImage';
import LayerPreview from './LayerPreview';
import Layer from '../image-processing/Layer';
import Crosshair from './Crosshair';
import '../styles/Preview.css'

type Props = {
	main: Layer,
	overlay: Layer,
	onMouseMove?: (x: number, y: number) => void,
	fullView: boolean
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
		const { main, overlay } = this.props;

		if (!this.props.main) return <div className='preview' />


		let maskStyle: React.CSSProperties = { position: 'absolute', left: 0, top: 0 };

		if (!this.props.fullView) {
			const mask = `circle(50px at ${this.state.x}px ${this.state.y}px)`;
			maskStyle = { ...maskStyle, clipPath: mask, WebkitClipPath: mask }
		}

		return (
			<div className='preview' >
				<div style={{ position: 'relative', cursor: 'none', width: main.width, height: main.height }} onMouseMove={this.mouseMoved}>
					<LayerPreview layer={main} />
					{overlay &&
						<div style={maskStyle}>
							<LayerPreview layer={overlay} />
						</div>
					}
					<Crosshair x={this.state.x} y={this.state.y} />
				</div>
			</div>
		);
	}
}