import Shader from "./Shader";
import { throwError } from "../utils/exceptions";
import RasterImage from "../lib/RasterImage";
import renderImage from "./utils/ImageRenderer";

export default class Layer {
	private readonly _shader: Shader;
	private readonly _canvas: HTMLCanvasElement;
	private readonly _context: WebGLRenderingContext;
	private readonly _data: Uint8Array;
	private readonly _renderingError?: string;

	public constructor(image: RasterImage | undefined, shader: Shader) {
		this._shader = shader;
		this._canvas = document.createElement('canvas');
		this._context = this._canvas.getContext('webgl') || throwError('Cannot create the context');

		if (!image) {
			this._renderingError = 'No image';
			this._data = new Uint8Array(0);
			return;
		}

		this._data = new Uint8Array(4 * image.width * image.height);
		this._canvas.width = image.width;
		this._canvas.height = image.height;

		try {
			renderImage(this._context, image, shader);
			this._context.readPixels(0, 0, image.width, image.height, this._context.RGBA, this._context.UNSIGNED_BYTE, this._data);
		}
		catch (error) {
			this._renderingError = error.message;
		}
	}

	public get width(): number {
		return this._canvas.width;
	}

	public get height(): number {
		return this._canvas.height;
	}

	public get shader(): Shader {
		return this._shader;
	}

	public get renderingError(): string | undefined {
		return this._renderingError;
	}

	public draw(destination: HTMLCanvasElement) {
		destination.width = this._canvas.width;
		destination.height = this._canvas.height;

		var target = destination.getContext('2d') || throwError<CanvasRenderingContext2D>('Cannot create 2d context');
		target.drawImage(this._canvas, 0, 0);
	}

	public getValue(x: number, y: number) {
		var index = (x + (this._canvas.height - y) * this._canvas.width) * 4;

		return {
			r: this._data[index],
			g: this._data[index + 1],
			b: this._data[index + 2]
		}
	}

	public dispose()
	{
		var loseContext = this._context.getExtension('WEBGL_lose_context');
		if (loseContext)
			loseContext.loseContext();
	}
}