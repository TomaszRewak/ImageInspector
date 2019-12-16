import React, { Component } from 'react'
import Shader from '../image-processing/Shader';
import AceEditor from 'react-ace';
import '../styles/ShaderEditor.css'

type Props = {
	shader: Shader
}
type State = {}

export default class ShaderEditor extends Component<Props, State> {
	public render() {
		return (
			<div className='shader-editor'>
				<div className='header'>Name</div>
				<div contentEditable={true} className='name-editor'>
					{this.props.shader.name}
				</div>
				<div className='header'>Vertex shader</div>
				<AceEditor mode='glsl' theme='chrome' value={this.props.shader.vertexShaderSource} className='code-editor vertex' />
				<div className='header'>Fragment shader</div>
				<AceEditor mode='glsl' theme='chrome' value={this.props.shader.fragmentShaderSource} className='code-editor fragment' />
				<div className='options'>
					<div className='option save'>Save</div>
					<div className='option cancel'>Cancel</div>
				</div>
			</div>
		)
	}
}