import React, { Component } from 'react'
import RasterImage from '../lib/RasterImage';

type Props = { source: string }
type State = {}

export default class ImageViewer extends Component<Props, State>
{
	private _glImage: RasterImage;

	public constructor(props: Props) {
		super(props);

		this.state = {};

		this._glImage = new RasterImage();
		this._glImage.width = 500;
		this._glImage.height = 500;

		const gl = this._glImage.glContext;

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	}

	public render(): React.ReactNode {
		return (
			<div>
				<img src={this.props.source} style={{ maxHeight: 500, maxWidth: 500 }} />
				<img src={this._glImage.url} style={{ maxHeight: 500, maxWidth: 500 }} />
			</div>
		);
	}
}