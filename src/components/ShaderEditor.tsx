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
				<div>
					{this.props.shader.name}
				</div>
				<div>Vertex shader</div>
				<AceEditor mode='glsl' theme='chrome' value={this.props.shader.vertexShaderSource} className='code-editor vertex' />
				<div>Fragment shader</div>
				<AceEditor mode='glsl' theme='chrome' value={this.props.shader.fragmentShaderSource} className='code-editor fragment' />
			</div>
		)
	}
}