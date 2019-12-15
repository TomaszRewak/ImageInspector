import React, { Component } from 'react'
import Shader from '../image-processing/Shader';

type Props = {
	shader: Shader
}
type State = {}

export default class ShaderEditor extends Component<Props, State> {
	public render() {
		return (
			<div>
				<div>
					{this.props.shader.name}
				</div>
				<div>
					{this.props.shader.vertexShaderSource}
				</div>
			</div>
		)
	}
}