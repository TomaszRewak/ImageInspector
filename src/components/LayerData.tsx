import React, { Component } from 'react'
import Layer from '../image-processing/Layer';

type Props = {
	layer: Layer,
	position: { x: number, y: number } | undefined,
	isSelected: boolean,
	onSelected: (layer: Layer) => void
	onEdit: (layer: Layer) => void
}
type State = {}


export default class LayerData extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);

		this.state = {};

		this.selected = this.selected.bind(this);
		this.edit = this.edit.bind(this);
	}

	private selected() {
		this.props.onSelected(this.props.layer);
	}

	private edit(e: React.MouseEvent) {
		this.props.onEdit(this.props.layer);
	}

	public render() {
		return (
			<div
				className={`layer-data ${this.props.isSelected && 'selected'} ${this.props.layer.renderingError && 'error'}`}
				onClick={this.selected}
				title={this.props.layer.renderingError}>
				<div className='layer-header'>
					<div className='layer-name'>{this.props.layer.shader.name}</div>
					<div className='edit' onClick={this.edit}>🖉</div>
				</div>
				{this.props.position &&
					this.getValues(this.props.position.x, this.props.position.y)
				}
				{!this.props.position &&
					<div className='layer-values'>
						<div className='layer-value placeholder'>000</div>
						<div className='layer-value placeholder'>000</div>
						<div className='layer-value placeholder'>000</div>
					</div>
				}
			</div>
		);
	}

	private getValues(x: number, y: number) {
		const value = this.props.layer.getValue(x, y)

		if (value.r == value.g && value.g == value.b)
			return this.getSingleValue(value.r);
		else
			return this.getThreeValues(value.r, value.g, value.b);
	}

	private getSingleValue(value: number) {
		return (
			<div className='layer-values'>
				{this.getValue(value, 'placeholder')}
				{this.getValue(value, 'gray')}
				{this.getValue(value, 'placeholder')}
			</div>
		)
	}

	private getThreeValues(r: number, g: number, b: number) {
		return (
			<div className='layer-values'>
				{this.getValue(r, 'red')}
				{this.getValue(g, 'green')}
				{this.getValue(b, 'blue')}
			</div>
		)
	}

	private getValue(value: number, className: string) {
		if (!value) value = 0;
		let str = value.toString();
		while (str.length < 3)
			str = `0${str}`;
		return <div className={`layer-value ${className}`}>{str}</div>
	}
}