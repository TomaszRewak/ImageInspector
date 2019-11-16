import React, { Component, MouseEvent } from 'react';
import RasterImage from '../lib/RasterImage';

type Props = {
	baseImage: RasterImage
};
type State = {
	mouseLeft: number,
	mouseTop: number,
};

export default class ImageLayer extends Component<Props, State>
{
	state = {
		mouseLeft: 0,
		mouseTop: 0
	};

	public constructor(props: Props) {
		super(props);

		this.mouseMoved = this.mouseMoved.bind(this);
	}

	componentDidMount() {
		this.updateCanvas();
	}

	componentDidUpdate() {
		this.updateCanvas();
	}

	private mouseMoved(event: MouseEvent) {
		console.log(Date.now())
		this.setState({
			mouseLeft: event.clientX,
			mouseTop: event.clientY
		})
	}

	private updateCanvas() {
		console.log('Optimize');

		const image = this.refs.canvas as HTMLCanvasElement;
		image.width = this.props.baseImage.width;
		image.height = this.props.baseImage.height;

		const baseImage = this.props.baseImage;
		const gl = image.getContext('webgl', { antialias: false });

		if (gl == null) throw Error();

		const vertexShaderSource = `
			attribute vec4 aVertexPosition;
			attribute vec2 aTexturePosition;

			varying lowp vec4 canvasPosition;
			varying lowp vec2 texturePosition;

			void main() {
				gl_Position = aVertexPosition;
				canvasPosition = aVertexPosition;
				texturePosition = aTexturePosition;
			}
		`;

		const fragmentShaderSource = `
			uniform sampler2D uSampler;

			varying lowp vec4 canvasPosition;
			varying lowp vec2 texturePosition;

			void main() {
				lowp vec4 sample1 = texture2D(uSampler, texturePosition);
				lowp vec4 sample2 = texture2D(uSampler, vec2(texturePosition.x + 0.01, texturePosition.y));

				lowp float diff = (sample1.r + sample1.g + sample1.b - sample2.r - sample2.g - sample2.b) * 0.5 * 0.33 + 0.5;

				lowp vec4 color = vec4(
					diff,
					diff,
					diff,
					1
				);

				gl_FragColor = color;
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

		const texture = this.loadTexture(gl, baseImage);
		const textureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
		const textureCoordinates = [
			0.0, 0.0,
			1.0, 0.0,
			0.0, 1.0,
			1.0, 1.0,
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

		const programInfo = {
			program: shaderProgram,
			attribLocations: {
				vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
				texturePosition: gl.getAttribLocation(shaderProgram, 'aTexturePosition'),
			},
			uniformLocations: {
				uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
			},
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

		gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
		gl.vertexAttribPointer(programInfo.attribLocations.texturePosition, numComponents, type, normalize, stride, offset);
		gl.enableVertexAttribArray(programInfo.attribLocations.texturePosition);

		gl.useProgram(programInfo.program);

		// Tell WebGL we want to affect texture unit 0
		gl.activeTexture(gl.TEXTURE0);
		// Bind the texture to texture unit 0
		gl.bindTexture(gl.TEXTURE_2D, texture);
		// Tell the shader we bound the texture to texture unit 0
		gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

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

	private loadTexture(gl: WebGLRenderingContext, image2: RasterImage) {
		const texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);

		const level = 0;
		const internalFormat = gl.RGBA;
		const width = 1;
		const height = 1;
		const border = 0;
		const srcFormat = gl.RGBA;
		const srcType = gl.UNSIGNED_BYTE;
		const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue

		gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
			width, height, border, srcFormat, srcType,
			pixel);

		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image2.imageData);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

		return texture;
	}

	public render(): React.ReactNode {
		const mask = `radial-gradient(ellipse 80px 80px at ${this.state.mouseLeft}px ${this.state.mouseTop}px, black 60px, transparent 80px)`;

		return (
			<div style={{ position: 'absolute', top: 0 }} onMouseMove={this.mouseMoved}>
				<canvas ref='canvas' style={{
					maxWidth: 500,
					maskImage: mask,
					WebkitMaskImage: mask
				}} />
			</div>
		);
	}
}