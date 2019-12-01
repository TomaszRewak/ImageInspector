import React, { Component } from 'react'
import Layer from '../image-processing/Layer';
import LayerData from './LayerData';
import '../styles/layers.css'

type Props = {
	layers: Layer[],
	x: number,
	y: number
}
type State = {}

export default class Layers extends Component<Props, State>
{
	public render() {
		return (
			<div className='layers'>
				<div>{this.props.x}</div>
				<div>{this.props.y}</div>
				{this.props.layers.map((layer, key) => <LayerData key={key} layer={layer} x={this.props.x} y={this.props.y} />)}
			</div>
		);
	}
}