export default class Shader {
	public readonly name: string;
	public readonly vertexShaderSource: string;
	public readonly fragmentShaderSource: string;

	constructor(name: string, vertexShader: string, fragmentShader: string) {
		this.name = name;
		this.vertexShaderSource = vertexShader;
		this.fragmentShaderSource = fragmentShader;
	}

	public static get identity() {
		return new Shader(
			'Base image',
			`
				attribute vec4 aVertexPosition;
				attribute vec2 aTexturePosition;

				varying lowp vec4 canvasPosition;
				varying lowp vec2 texturePosition;

				void main() {
					gl_Position = aVertexPosition;
					canvasPosition = aVertexPosition;
					texturePosition = aTexturePosition;
				}
			`,
			`
				uniform sampler2D uSampler;

				varying lowp vec4 canvasPosition;
				varying lowp vec2 texturePosition;

				void main() {
					gl_FragColor = texture2D(uSampler, texturePosition);
				}
			`
		);
	}

	public static get verticalLines() {
		return new Shader(
			'Vertical line detector',
			`
				attribute vec4 aVertexPosition;
				attribute vec2 aTexturePosition;

				varying lowp vec4 canvasPosition;
				varying lowp vec2 texturePosition;

				void main() {
					gl_Position = aVertexPosition;
					canvasPosition = aVertexPosition;
					texturePosition = aTexturePosition;
				}
			`,
			`
				uniform sampler2D uSampler;

				varying lowp vec4 canvasPosition;
				varying lowp vec2 texturePosition;

				void main() {
					lowp vec4 sample1 = texture2D(uSampler, texturePosition);
					lowp vec4 sample2 = texture2D(uSampler, vec2(texturePosition.x + 0.01, texturePosition.y));

					lowp float diff = (sample1.r + sample1.g + sample1.b - sample2.r - sample2.g - sample2.b) * 0.5 * 0.33 + 0.5;

					lowp vec4 color = vec4(
						diff,
						diff,
						diff,
						1
					);

					gl_FragColor = color;
				}
			`
		);
	}
}