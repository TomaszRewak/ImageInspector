import React, { Component } from 'react'
import Shader from '../image-processing/Shader';
import AceEditor from 'react-ace';
import '../styles/ShaderEditor.css'
import RasterImage from '../lib/RasterImage';
import Layer from '../image-processing/Layer';

type Props = {
	shader: Shader,
	image: RasterImage
}
type State = {
	name: string
	vertexShaderSource: string,
	fragmentShaderSource: string,
	error?: string
}

export default class ShaderEditor extends Component<Props, State> {
	state = {
		name: this.props.shader.name,
		vertexShaderSource: this.props.shader.vertexShaderSource,
		fragmentShaderSource: this.props.shader.fragmentShaderSource,
		error: undefined
	}

	private compile = () => {
		try {
			new Layer(this.props.image, this.shader);
		}
		catch (error) {
			this.setState({ error });
		}
	}

	private save = () => {

	}

	private delete = () => {

	}

	private cancel = () => {

	}

	private vertexShaderChanged = (vertexShaderSource: string) => {
		this.setState({ vertexShaderSource });
	}

	private fragmentShaderChanged = (fragmentShaderSource: string) => {
		this.setState({ fragmentShaderSource });
	}

	private get shader()
	{
		return new Shader(this.state.name, this.state.vertexShaderSource, this.state.fragmentShaderSource);
	}

	public render() {
		console.dir(this.state.error)
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
				<pre>{`${this.state.error}`}</pre>
			</div>
		)
	}
}