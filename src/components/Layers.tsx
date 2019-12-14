import React, { Component } from 'react'
import Layer from '../image-processing/Layer';
import LayerData from './LayerData';
import '../styles/layers.css'

type Props = {
	layers: Layer[],
	x: number,
	y: number,
	selected: (index: number) => void
}
type State = {}

export default class Layers extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);

		this.state = {};

		this.selected = this.selected.bind(this);
	}

	private selected(layer: Layer) {
		this.props.selected(this.props.layers.indexOf(layer));
	}

	public render() {
		return (
			<div className='layers'>
				<div className='preview-data'>
					{this.props.layers.map((layer, key) => <LayerData key={key} layer={layer} x={this.props.x} y={this.props.y} selected={this.selected} />)}
				</div>
				<div className='coordinates'>
					<div>{'{ x: '}</div>
					<div className='coordinate'>{Math.round(this.props.x)}</div>
					<div>{', y: '}</div>
					<div className='coordinate'>{Math.round(this.props.y)}</div>
					<div>{'}'}</div>
				</div>
			</div>
		);
	}
}