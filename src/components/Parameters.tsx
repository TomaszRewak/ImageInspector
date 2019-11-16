import React, { Component } from 'react'
import { AppState } from '../store';
import { MouseCoordinates } from '../store/mouse/Types';
import Parameter from './Parameter';
import { connect } from 'react-redux';

type P = {
	mouseCoordinates: MouseCoordinates
};
type S = {
	parameters: number[]
};

class Parameters extends Component<P, S>
{
	state = {
		parameters: [1, 2, 3]
	}

	public render(): React.ReactNode {
		return (
			<div>
				<div>
					<div>{this.props.mouseCoordinates.x}</div>
					<div>{this.props.mouseCoordinates.y}</div>
				</div>
				{
					this.state.parameters.map((p, i) => <Parameter key={i} mouseCoordinates={this.props.mouseCoordinates} />)
				}
			</div>
		);
	}
}

export default connect(
	(state: AppState) => {
		return {
			mouseCoordinates: state.mouse.mouseCoordinates
		}
	}
)(Parameters);