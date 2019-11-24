import Shader from "./Shader";
import { throwError } from "../utils/exceptions";
import linkProgram from "./utils/ProgramLinker";
import loadTexture from "./utils/TextureLoader";
import bindBuffer from "./utils/BufferBinder";
import RasterImage from "../lib/RasterImage";
import renderImage from "./utils/ImageRenderer";

export default class Layer {
	private readonly _canvas: HTMLCanvasElement;
	private readonly _context: WebGLRenderingContext;
	private readonly _data: Uint8Array;

	public constructor(image: RasterImage, shader: Shader) {
		this._canvas = document.createElement('canvas');
		this._context = this._canvas.getContext('webgl') || throwError('Cannot create the context');
		this._data = new Uint8Array(4 * image.width * image.height);

		this._canvas.width = image.width;
		this._canvas.height = image.height;

		renderImage(this._context, image, shader);

		this._context.readPixels(0, 0, image.width, image.height, this._context.RGBA, this._context.UNSIGNED_BYTE, this._data);
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
}