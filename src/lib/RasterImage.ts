export default class RasterImage {
	private _canvas: HTMLCanvasElement;

	public constructor() {
		this._canvas = document.createElement('canvas');
	}

	public load(image: HTMLImageElement) {
		this.width = image.width;
		this.height = image.height;

		this.imageContext.drawImage(image, 0, 0);
	}

	public get imageContext(): CanvasRenderingContext2D {
		const context = this._canvas.getContext('2d');
		if (context == null) throw new Error('Browser is not supported');
		return context;
	}

	public get glContext(): WebGLRenderingContext {
		const context = this._canvas.getContext('webgl');
		if (context == null) throw new Error('Browser is not supported');
		return context;
	}

	public get width(): number {
		return this._canvas.width;
	}

	public set width(value: number) {
		this._canvas.width = value;
	}

	public get height(): number {
		return this._canvas.height;
	}

	public set height(value: number) {
		this._canvas.height = value;
	}

	public get canvas(): HTMLCanvasElement {
		return this._canvas;
	}

	public get imageData(): ImageData {
		return this.imageContext.getImageData(0, 0, this.width, this.height);
	}

	public get url(): string {
		return this.canvas.toDataURL()
	}
}