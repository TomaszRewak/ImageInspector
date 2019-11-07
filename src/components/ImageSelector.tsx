import React, { Component } from 'react'
import RasterImage from '../lib/RasterImage';

type Props = {};
type State = { ready: boolean };

export class ImageSelector extends Component<Props, State> {
	private _image: RasterImage;

	public constructor(props: Props) {
		super(props);

		this._image = new RasterImage();

		this.state = {
			ready: false
		};

		this._imageLoaded = this._imageLoaded.bind(this);
		this._imageNotLoaded = this._imageNotLoaded.bind(this);
		this._imageSelected = this._imageSelected.bind(this);

		this._loadImage("./resources/apple.jpg");
	}

	private _loadImage(source: File | string): void {
		this._image.load(source).then(this._imageLoaded, this._imageNotLoaded);
	}

	private _imageLoaded(): void {
		this.setState({
			ready: true
		});
	}

	private _imageNotLoaded(reason: any): void {
		this.setState({
			ready: true
		});
	}

	private _imageSelected(event: React.FormEvent<HTMLInputElement>) {
		if (event.currentTarget.files == null) throw Error("No file selected");

		this._loadImage(event.currentTarget.files[0]);
	}

	public render(): React.ReactNode {
		if (!this.state.ready)
			return <div>Loading image</div>;

		return (
			<div>
				<div className="file-form">
					<label htmlFor="hidden-file-button" className="ui primary button">
						Open File
					</label>
					<input type="file" id="hidden-file-button" onChange={this._imageSelected} style={{ display: 'none' }} />
				</div>
				<img src={this._image && this._image.url} />
			</div>
		);
	}
}