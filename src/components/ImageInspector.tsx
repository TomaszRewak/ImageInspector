import React, { Component } from 'react';
import RasterImage from '../lib/RasterImage';
import Preview from './Preview';
import Layer from '../image-processing/Layer';
import Shader from '../image-processing/Shader';
import Layers from './Layers';
import '../styles/ImageInspector.css'
import Menu from './Menu';
import ShaderEditor from './ShaderEditor';

type Props = {}
type State = {
	baseImage?: RasterImage,
	layers: Layer[],
	selectedLayer: number,
	position: { x: number, y: number } | undefined,
	editedLayer?: number
}

export default class ImageInspector extends Component<Props, State>
{
	public constructor(props: Props) {
		super(props);

		this.state = {
			layers: [
				new Layer(undefined, Shader.identity),
				new Layer(undefined, Shader.verticalLines),
				new Layer(undefined, Shader.horizontalLines)],
			selectedLayer: 1,
			position: undefined
		}
	}

	private imageSelected = (baseImage: RasterImage) => {
		this.setState({
			baseImage,
			layers: this.state.layers.map(layer => new Layer(baseImage, layer.shader))
		});
	}

	private shadersSelected = (shaders: Shader[]) => {
		this.setState({
			layers: shaders.map(shader => new Layer(this.state.baseImage, shader)),
			selectedLayer: 0,
			editedLayer: undefined
		})
	}

	private mouseMoved = (position: { x: number, y: number } | undefined) => {
		this.setState({ position });
	}

	private selected = (selectedLayer: number) => {
		this.setState({ selectedLayer });
	}

	private edit = (editedLayer: number) => {
		this.setState({ editedLayer });
	}

	private save = (oldShader: Shader, newShader: Shader) => {
		this.setState({ layers: this.state.layers.map(layer => layer.shader == oldShader ? new Layer(this.state.baseImage, newShader) : layer), editedLayer: undefined });
	}

	private cancel = () => {
		this.setState({ editedLayer: undefined })
	}

	private delete = (shader: Shader) => {
		this.setState({ layers: this.state.layers.filter(layer => layer.shader != shader), selectedLayer: 0, editedLayer: undefined })
	}

	private add = () => {
		this.setState({
			layers: [...this.state.layers, new Layer(this.state.baseImage, Shader.empty)],
			editedLayer: this.state.layers.length,
			selectedLayer: this.state.layers.length
		})
	}

	public componentDidUpdate = (prevProps: Props, prevState: State) => {
		for (const layer of prevState.layers.filter(l1 => this.state.layers.every(l2 => l1 != l2)))
			layer.dispose();
	}

	public render(): React.ReactNode {
		return (
			<div className='image-inspector fill'>
				<Menu
					imageSelected={this.imageSelected}
					shadersSelected={this.shadersSelected}
					layers={this.state.layers} />
				{!!this.state.editedLayer &&
					<ShaderEditor
						key={this.state.editedLayer}
						image={this.state.baseImage}
						shader={this.state.layers[this.state.editedLayer].shader}
						onSave={this.save}
						onCancel={this.cancel}
						onDelete={this.delete} />
				}
				{!this.state.editedLayer &&
					<Preview
						main={this.state.layers[0]}
						overlay={this.state.layers[this.state.selectedLayer]}
						onMouseMove={this.mouseMoved} />
				}
				<Layers
					layers={this.state.layers}
					position={this.state.position}
					selectedLayer={this.state.selectedLayer}
					editedLayer={this.state.editedLayer}
					onSelected={this.selected}
					onEdit={this.edit}
					onAdd={this.add} />
			</div>
		)
	}
}