import React, { Component } from 'react'
import Shader from '../image-processing/Shader';
import AceEditor from 'react-ace';
import '../styles/ShaderEditor.css'
import RasterImage from '../lib/RasterImage';
import Layer from '../image-processing/Layer';
import { ViewportWidthProperty } from 'csstype';

type Props = {
	shader: Shader,
	image?: RasterImage,
	onSave: (oldValue: Shader, newValue: Shader) => void,
	onDelete: (shader: Shader) => void,
	onCancel: () => void
}
type State = {
	name: string
	vertexShaderSource: string,
	fragmentShaderSource: string,
	error?: string,
	compiled: boolean
}

export default class ShaderEditor extends Component<Props, State> {
	state = {
		name: this.props.shader.name,
		vertexShaderSource: this.props.shader.vertexShaderSource,
		fragmentShaderSource: this.props.shader.fragmentShaderSource,
		error: undefined,
		compiled: false
	}

	private compile = () => {
		var layer = new Layer(this.props.image, this.shader);

		if (layer.renderingError)
			this.setState({ error: layer.renderingError, compiled: false });
		else
			this.setState({ error: undefined, compiled: true });
	}

	private save = () => {
		this.props.onSave(this.props.shader, this.shader);
	}

	private delete = () => {
		this.props.onDelete(this.props.shader);
	}

	private cancel = () => {
		this.props.onCancel();
	}

	private vertexShaderChanged = (vertexShaderSource: string) => {
		this.setState({ vertexShaderSource, compiled: false });
	}

	private fragmentShaderChanged = (fragmentShaderSource: string) => {
		this.setState({ fragmentShaderSource, compiled: false });
	}

	private get shader() {
		return new Shader(this.state.name, this.state.vertexShaderSource, this.state.fragmentShaderSource);
	}

	public render() {
		return (
			<div className='shader-editor'>
				<div className='header'>Name</div>
				<div contentEditable={true} className='name-editor'>
					{this.state.name}
				</div>
				<div className='header'>Vertex shader</div>
				<AceEditor
					mode='glsl'
					theme='chrome'
					value={this.state.vertexShaderSource}
					onChange={this.vertexShaderChanged}
					className='code-editor vertex' />
				<div className='header'>Fragment shader</div>
				<AceEditor
					mode='glsl'
					theme='chrome'
					value={this.state.fragmentShaderSource}
					onChange={this.fragmentShaderChanged}
					className='code-editor fragment' />
				<div className='options'>
					<div className='option compile' onClick={this.compile}>Compile</div>
					<div className='option save' onClick={this.save}>Save</div>
					<div className='option delete' onClick={this.delete}>Delete</div>
					<div className='option cancel' onClick={this.cancel}>Cancel</div>
				</div>
				{this.state.error &&
					<pre className='logs error'>{this.state.error}</pre>
				}
				{!this.state.error && this.state.compiled &&
					<pre className='logs'>Compiled successfully</pre>
				}
				{!this.state.error && !this.state.compiled &&
					<pre className='logs'></pre>
				}
			</div>
		)
	}
}