import React, { Component } from 'react';
import Parameter from './Parameter';
import { connect } from 'react-redux';

type P = {};
type S = {
	parameters: number[]
};

export default class Parameters extends Component<P, S>
{
	state = {
		parameters: [1, 2, 3]
	}

	public render(): React.ReactNode {
		return (
			<div>
				<div>
					<div>{0}</div>
					<div>{0}</div>
				</div>
				{
					this.state.parameters.map((p, i) => <Parameter key={i} />)
				}
			</div>
		);
	}
}