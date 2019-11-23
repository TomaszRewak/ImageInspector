import Shader from "./Shader";
import { throwError } from "../utils/exceptions";
import linkProgram from "./utils/ProgramLinker";
import loadTexture from "./utils/TextureLoader";
import bindBuffer from "./utils/BufferBinder";
import RasterImage from "../lib/RasterImage";

export default class Layer {
	private readonly _canvas: HTMLCanvasElement;
	private readonly _context: WebGLRenderingContext;
	private readonly _program: WebGLProgram;
	private readonly _vertexBuffer: WebGLBuffer;
	private readonly _textureCoordinatesBuffer: WebGLBuffer;
	private readonly _data: Uint8Array;

	public constructor(image: RasterImage, shader: Shader) {
		this._canvas = document.createElement('canvas');
		this._context = this._canvas.getContext('webgl') || throwError('Cannot create the context');
		this._program = this._context.createProgram() || throwError('Cannot create program');
		this._vertexBuffer = this._context.createBuffer() || throwError('Cannot create buffer');
		this._textureCoordinatesBuffer = this._context.createBuffer() || throwError('Cannot create buffer');

		this.initializeBuffers();
		this.link(shader);
		this.load(image);
		this.dispose();

		this._data = new Uint8Array(4 * this._canvas.width * this._canvas.height);
		this._context.readPixels(0, 0, this._canvas.width, this._canvas.height, this._context.RGBA, this._context.UNSIGNED_BYTE, this._data);
	}

	private initializeBuffers() {
		this._context.bindBuffer(this._context.ARRAY_BUFFER, this._vertexBuffer);
		this._context.bufferData(this._context.ARRAY_BUFFER,
			new Float32Array([
				-1.0, 1.0,
				1.0, 1.0,
				-1.0, -1.0,
				1.0, -1.0,
			]),
			this._context.STATIC_DRAW);

		this._context.bindBuffer(this._context.ARRAY_BUFFER, this._textureCoordinatesBuffer);
		this._context.bufferData(this._context.ARRAY_BUFFER,
			new Float32Array([
				0.0, 0.0,
				1.0, 0.0,
				0.0, 1.0,
				1.0, 1.0,
			]),
			this._context.STATIC_DRAW);
	}

	public draw(destination: HTMLCanvasElement) {
		destination.width = this._canvas.width;
		destination.height = this._canvas.height;

		var target = destination.getContext('2d') || throwError<CanvasRenderingContext2D>('Cannot create 2d context');
		target.drawImage(this._canvas, 0, 0);
	}

	public getValue(x: number, y: number): number {
		return this._data[(x + y * this._canvas.width) * 4];
	}

	private link(shader: Shader) {
		linkProgram(this._context, this._program, shader);
	}

	private load(image: RasterImage) {
		this._canvas.width = image.width;
		this._canvas.height = image.height;
		this._context.viewport(0, 0, image.width, image.height);

		this.clear();

		this._context.useProgram(this._program);

		bindBuffer(this._context, this._program, this._vertexBuffer, 'aVertexPosition');
		bindBuffer(this._context, this._program, this._textureCoordinatesBuffer, 'aTexturePosition');

		const texture = loadTexture(this._context, this._program, image.imageData, 'uSampler');

		this._context.drawArrays(this._context.TRIANGLE_STRIP, 0, 4);
		this._context.deleteTexture(texture);
	}

	private clear() {
		this._context.clearColor(0.0, 0.0, 0.0, 1.0);

		this._context.clear(this._context.COLOR_BUFFER_BIT);
	}

	private dispose(): void {
		if (this._vertexBuffer)
			this._context.deleteBuffer(this._vertexBuffer);
		if (this._textureCoordinatesBuffer)
			this._context.deleteBuffer(this._textureCoordinatesBuffer);
		if (this._program)
			this._context.deleteProgram(this._program);
	}
}