import React, { Component } from 'react'

type Props = { source: string }
type State = {}

export default class ImageViewer extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);

		this.state = {};
	}

	public render(): React.ReactNode {
		return (
			<div>
				<img src={this.props.source} />
			</div>
		);
	}
}