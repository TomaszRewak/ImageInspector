export default class RasterImage {
	private _canvas: HTMLCanvasElement;
	private _context: CanvasRenderingContext2D;

	public constructor(image: HTMLImageElement) {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		if (context == null) throw new Error('Browser is not supported');

		this._canvas = canvas;
		this._canvas.width = image.width;
		this._canvas.height = image.height;
		
		this._context = context;
		this._context.drawImage(image, 0, 0);
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
}