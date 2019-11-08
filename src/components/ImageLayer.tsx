import React, { Component } from 'react';
import RasterImage from '../lib/RasterImage';

type Props = {};
type State = {};

export default class ImageLayer extends Component<Props, State>
{
	private _glImage: RasterImage;

	public constructor(props: Props) {
		super(props);

		this.state = {};

		this._glImage = new RasterImage();
		this._glImage.width = 500;
		this._glImage.height = 500;

		const gl = this._glImage.glContext;

		const vertexShaderSource = `
			attribute vec4 aVertexPosition;
			
			varying lowp vec4 pos;
		
			void main() {
				gl_Position = aVertexPosition;
				pos = aVertexPosition;
			}
		`;

		const fragmentShaderSource = `
			varying lowp vec4 pos;

			void main() {
				gl_FragColor = vec4(pos.x, pos.y, pos.z, 1.0);
			}
		`;

		const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

		const shaderProgram = gl.createProgram();

		if (shaderProgram == null) throw new Error();

		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);

		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			throw Error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
		}

		const positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		const positions = [
			-1.0, 1.0,
			1.0, 1.0,
			-1.0, -1.0,
			1.0, -1.0,
		];
		gl.bufferData(gl.ARRAY_BUFFER,
			new Float32Array(positions),
			gl.STATIC_DRAW);

		const programInfo = {
			program: shaderProgram,
			attribLocations: {
				vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
			},
			// uniformLocations: {
			// 	projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			// 	modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
			// },
		};

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		const numComponents = 2;  // pull out 2 values per iteration
		const type = gl.FLOAT;    // the data in the buffer is 32bit floats
		const normalize = false;  // don't normalize
		const stride = 0;         // how many bytes to get from one set of values to the next
		const offset = 0;         // how many bytes inside the buffer to start from
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.vertexAttribPointer(
			programInfo.attribLocations.vertexPosition,
			numComponents,
			type,
			normalize,
			stride,
			offset);
		gl.enableVertexAttribArray(
			programInfo.attribLocations.vertexPosition);

		gl.useProgram(programInfo.program);

		// gl.uniformMatrix4fv(
		// 	programInfo.uniformLocations.projectionMatrix,
		// 	false,
		// 	projectionMatrix);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}

	private loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
		const shader = gl.createShader(type);

		if (shader == null) throw Error();

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
			throw Error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));

		return shader;
	}

	public render(): React.ReactNode {
		return (
			<div>
				<img src={this._glImage.url} style={{ maxHeight: 500, maxWidth: 500 }} />
			</div>
		);
	}
}