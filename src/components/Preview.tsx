import React, { Component, MouseEvent } from 'react'
import RasterImage from '../lib/RasterImage';
import LayerPreview from './LayerPreview';
import Layer from '../image-processing/Layer';
import Crosshair from './Crosshair';
import '../styles/Preview.css'

type Props = {
	main: Layer,
	overlay: Layer,
	onMouseMove: (position: { x: number, y: number } | undefined) => void
}
type State = {
	x: number,
	y: number,
	mouseOver: boolean
}

export default class Preview extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);

		this.state = {
			x: 0,
			y: 0,
			mouseOver: false
		};

		this.mouseMoved = this.mouseMoved.bind(this);
		this.mouseLeft = this.mouseLeft.bind(this);
		this.mouseEntered = this.mouseEntered.bind(this);
	}

	private mouseMoved(event: MouseEvent) {
		var rect = (event.target as any).getBoundingClientRect();
		var x = event.clientX - rect.left;
		var y = event.clientY - rect.top;

		this.setState({ x, y })

		this.props.onMouseMove({ x, y });

		event.stopPropagation();
		event.preventDefault();
	}

	private mouseLeft() {
		this.setState({ mouseOver: false });
		this.props.onMouseMove(undefined);
	}

	private mouseEntered() {
		this.setState({ mouseOver: true });
	}

	public render(): React.ReactNode {
		const { main, overlay } = this.props;

		if (this.props.main.renderingError) return <div className='preview' />

		const radius = this.state.mouseOver
			? 50
			: Math.sqrt(this.props.main.width * this.props.main.width + this.props.main.height * this.props.main.height);

		return (
			<div className='preview' >
				<div
					className='image'
					style={{ width: main.width, height: main.height }}
					onMouseMove={this.mouseMoved}
					onMouseLeave={this.mouseLeft}
					onMouseEnter={this.mouseEntered}>
					<LayerPreview layer={main} />
					{overlay &&
						<div className='layer-mask'>
							<LayerPreview layer={overlay} />
							<svg width='0' height='0'>
								<defs>
									<clipPath id='svgStars'>
										<rect x='-1' y='-1' width='1' height='1' />
										<circle r={radius} cx={this.state.x} cy={this.state.y} />
										<rect x={this.props.main.width} y={this.props.main.height} width='1' height='1' />
									</clipPath>
								</defs>
							</svg>
						</div>
					}
					{this.state.mouseOver &&
						<Crosshair x={this.state.x} y={this.state.y} />
					}
				</div>
			</div>
		);
	}
}