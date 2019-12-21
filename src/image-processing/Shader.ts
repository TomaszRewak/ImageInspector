const vertexShader =
	`
precision highp float;

attribute vec4 aVertexPosition;
attribute vec2 aTexturePosition;

varying vec4 canvasPosition;
varying vec2 texturePosition;

void main() {
	gl_Position = aVertexPosition;
	canvasPosition = aVertexPosition;
	texturePosition = aTexturePosition;
}
`;

const fragmentShaderPrefix =
	`
precision highp float;

uniform sampler2D uSampler;
uniform vec2 uSize;

varying vec4 canvasPosition;
varying vec2 texturePosition;

vec4 colorAt(float x, float y)
{
	return texture2D(uSampler, vec2(x / uSize.x, y / uSize.y));
}

void main() {
	vec2 position = vec2(texturePosition.x * uSize.x, texturePosition.y * uSize.y);
`;

const fragmentShaderPostfix =
	`
}
`;

export default class Shader {
	public readonly name: string;
	public readonly vertexShaderSource: string;
	public readonly fragmentShaderSource: string;

	constructor(name: string, vertexShaderSource: string, fragmentShaderSource: string) {
		this.name = name;
		this.vertexShaderSource = vertexShaderSource;
		this.fragmentShaderSource = fragmentShaderSource;
	}

	public static get identity() {
		return new Shader(
			'Base image',
			vertexShader,
			`${fragmentShaderPrefix}
	gl_FragColor = texture2D(uSampler, texturePosition);
${fragmentShaderPostfix}`
		);
	}

	public static get verticalLines() {
		return new Shader(
			'Vertical line detector',
			vertexShader,
			`${fragmentShaderPrefix}
	lowp vec4 sample1 = colorAt(position.x - 1.0, position.y);
	lowp vec4 sample2 = colorAt(position.x + 1.0, position.y);

	lowp float diff = abs(sample1.r + sample1.g + sample1.b - sample2.r - sample2.g - sample2.b) / 3.0;

	lowp vec4 color = vec4(
		diff,
		diff,
		diff,
		1
	);

	gl_FragColor = color;
${fragmentShaderPostfix}`
		);
	}

	public static get horizontalLines() {
		return new Shader(
			'Horizontal line detector',
			vertexShader,
			`${fragmentShaderPrefix}
	lowp vec4 sample1 = colorAt(position.x, position.y - 1.0);
	lowp vec4 sample2 = colorAt(position.x, position.y + 1.0);

	lowp float diff = abs(sample1.r + sample1.g + sample1.b - sample2.r - sample2.g - sample2.b) / 3.0;

	lowp vec4 color = vec4(
		diff,
		diff,
		diff,
		1
	);

	gl_FragColor = color;
${fragmentShaderPostfix}`
		);
	}
}

export { vertexShader, fragmentShaderPrefix, fragmentShaderPostfix }