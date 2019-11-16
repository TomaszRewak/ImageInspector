import React, { Component } from 'react'
import { MouseCoordinates } from '../store/mouse/Types';

type P = {
	mouseCoordinates: MouseCoordinates
};
type S = {};

export default class Parameter extends Component<P, S>
{
	public render(): React.ReactNode {
		return (
			<div>

			</div>
		);
	}
}

