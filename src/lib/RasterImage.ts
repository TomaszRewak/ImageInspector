import loadImage from "./ImageLoader";

export default class RasterImage {
	private _canvas: HTMLCanvasElement;
	private _context: CanvasRenderingContext2D;

	public constructor() {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		if (context == null) throw new Error('Browser is not supported');

		this._canvas = canvas;
		this._context = context;

		this._loaded = this._loaded.bind(this);
	}

	public load(source: string | File): Promise<void> {
		return loadImage(source).then(this._loaded);
	}

	public get width(): number {
		return this._canvas.width;
	}

	public get height(): number {
		return this._canvas.height;
	}

	public get canvas(): HTMLCanvasElement {
		return this._canvas;
	}

	public get imageData(): ImageData {
		return this._context.getImageData(0, 0, this.width, this.height);
	}

	public get url(): string {
		return this.canvas.toDataURL()
	}

	private _loaded(image: HTMLImageElement): void {
		this._canvas.width = image.width;
		this._canvas.height = image.height;

		this._context.drawImage(image, 0, 0);
	}
}