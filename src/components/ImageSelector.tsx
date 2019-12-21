import React, { Component } from 'react'
import RasterImage from '../lib/RasterImage';
import loadImage from '../lib/ImageLoader';

type Props = { selected: (image: RasterImage) => void };
type State = { ready: boolean };

export class ImageSelector extends Component<Props, State> {
	public constructor(props: Props) {
		super(props);

		this.state = {
			ready: true
		};

		this._imageLoaded = this._imageLoaded.bind(this);
		this._imageNotLoaded = this._imageNotLoaded.bind(this);
		this._imageSelected = this._imageSelected.bind(this);
	}

	private _loadImage(source: File | string): void {
		loadImage(source).then(this._imageLoaded, this._imageNotLoaded);
	}

	private _imageLoaded(image: RasterImage): void {
		this.setState({
			ready: true
		});

		this.props.selected(image);
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
						Open file
					</label>
					<input type="file" id="hidden-file-button" onChange={this._imageSelected} style={{ display: 'none' }} />
				</div>
			</div>
		);
	}
}