import React, { Component } from 'react'
import Layer from '../image-processing/Layer';

type Props = {
	layer: Layer,
	x: number,
	y: number
}
type State = {}


export default class LayerData extends Component<Props, State>
{
	public render()
	{
		const value = this.props.layer.getValue(this.props.x, this.props.y)

		return (
			<div>
				<div>{value.r}</div>
				<div>{value.g}</div>
				<div>{value.b}</div>
				<div>{this.props.x}</div>
				<div>{this.props.y}</div>
			</div>
		);
	}
}