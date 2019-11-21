import Shader from "./Shader";
import { throwError } from "../utils/exceptions";
import linkProgram from "./utils/ProgramLinker";
import loadTexture from "./utils/TextureLoader";
import bindBuffer from "./utils/BufferBinder";

export default class Layer {
	private readonly _context: WebGLRenderingContext;
	private readonly _program: WebGLProgram;
	private readonly _vertexBuffer: WebGLBuffer;
	private readonly _textureCoordinatesBuffer: WebGLBuffer;

	public constructor(context: WebGLRenderingContext, shader: Shader) {
		this._context = context;
		this._program = context.createProgram() || throwError('Cannot create program');
		this._vertexBuffer = context.createBuffer() || throwError('Cannot create buffer');
		this._textureCoordinatesBuffer = context.createBuffer() || throwError('Cannot create buffer');

		linkProgram(this._context, this._program, shader);

		this.initializeBuffers();
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

	public transform(image: ImageData) {
		this.clear();

		this._context.useProgram(this._program);

		bindBuffer(this._context, this._program, this._vertexBuffer, 'aVertexPosition');
		bindBuffer(this._context, this._program, this._textureCoordinatesBuffer, 'aTexturePosition');
		
		const texture = loadTexture(this._context, this._program, image, 'uSampler');

		this._context.drawArrays(this._context.TRIANGLE_STRIP, 0, 4);
		this._context.deleteTexture(texture);
	}

	private clear() {
		this._context.clearColor(0.0, 0.0, 0.0, 1.0);
		this._context.clear(this._context.COLOR_BUFFER_BIT);
	}

	public dispose(): void {
		if (this._vertexBuffer)
			this._context.deleteBuffer(this._vertexBuffer);
		if (this._textureCoordinatesBuffer)
			this._context.deleteBuffer(this._textureCoordinatesBuffer);
		if (this._program)
			this._context.deleteProgram(this._program);
	}
}