import React, { Component } from 'react'
import RasterImage from '../lib/RasterImage';
import loadImage from '../lib/ImageLoader';

type Props = { selected: (image: RasterImage) => void };
type State = {};

export class ImageSelector extends Component<Props, State> {
	private _fileSelected = (event: React.FormEvent<HTMLInputElement>) => {
		if (event.currentTarget.files == null) throw Error("No file selected");
		loadImage(event.currentTarget.files[0]).then(this.props.selected);
	}

	public render(): React.ReactNode {
		return (
			<div className="file-form">
				<label htmlFor="hidden-file-button" className="ui primary button">
					Load image
					</label>
				<input type="file" id="hidden-file-button" onChange={this._fileSelected} style={{ display: 'none' }} />
			</div>
		);
	}
}