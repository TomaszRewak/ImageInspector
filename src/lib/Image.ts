export default class RasterImage {
	private _source?: string | File;
	private _promise: Promise<void>;

	private _canvas: HTMLCanvasElement;
	private _context: CanvasRenderingContext2D;

	public constructor(url?: string | File) {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		if (context == null) throw new Error('Browser is not supported');

		this._source = url;
		this._canvas = canvas;
		this._context = context;
		this._promise = Promise.resolve();
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

	public load(): Promise<void> {
		if (!this._promise && this._source) {
			this._promise = new Promise<void>((resolve, reject) => {
				var image = new Image;
				image.crossOrigin = 'Anonymous';
				image.onload = () => {
					this._loaded(image);
					resolve();
				};

				if (typeof this._source == 'string') {
					image.src = this._source;
				}
				else {
					var reader = new FileReader();

					reader.onload = (event: any) => {
						image.src = event.target.result;
					};
					
					if (this._source == undefined)
						reject(Error('Error loading a file'))
					else
						reader.readAsDataURL(this._source);
				}
			});
		}

		return this._promise;
	}

	private _loaded(image: HTMLImageElement): void {
		this._canvas.width = image.width;
		this._canvas.height = image.height;

		this._context.drawImage(image, 0, 0);
	}
}