import React, { Component } from "react";
import '../styles/Crosshair.css'

type Props = { x: number, y: number, width: number, height: number };
type State = {
	left: boolean,
	top: boolean
};

export default class Crosshair extends Component<Props, State> {
	public constructor(props: Props) {
		super(props);

		this.state = {
			left: true,
			top: true
		}
	}

	public componentDidUpdate(prevProps: Props) {
		if (this.state.left && this.props.x > this.props.width * 0.66)
			this.setState({ left: false });
		else if (!this.state.left && this.props.x < this.props.width * 0.33)
			this.setState({ left: true });

		if (this.state.top && this.props.y > this.props.height * 0.66)
			this.setState({ top: false });
		else if (!this.state.top && this.props.y < this.props.height * 0.33)
			this.setState({ top: true });
	}

	public render() {
		return (
			<div className='crosshair' >
				<svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
					<rect x={0} y={this.props.y} width='100%' height={1} />
					<rect x={this.props.x} y={0} width={1} height='100%' />
				</svg>
				<div className='location' style={{
					left: this.state.left ? this.props.x : undefined,
					right: this.state.left ? undefined : this.props.width - this.props.x,
					top: this.state.top ? undefined : 0,
					bottom: this.state.top ? 0 : undefined,
				}}>{this.props.x}</div>
				<div className='location' style={{
					left: this.state.left ? undefined : 0,
					right: this.state.left ? 0 : undefined,
					top: this.state.top ? this.props.y : undefined,
					bottom: this.state.top ? undefined : this.props.height - this.props.y
				}}>{this.props.y}</div>
			</div>
		);
	}
}