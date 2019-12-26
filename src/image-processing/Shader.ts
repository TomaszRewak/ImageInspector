const vertexShader =
	`/**/ precision highp float;
/**/
/**/ attribute vec4 aVertexPosition;
/**/ attribute vec2 aTexturePosition;
/**/
/**/ varying vec4 canvasPosition;
/**/ varying vec2 texturePosition;
/**/
/**/ void main() {
/**/ 	gl_Position = aVertexPosition;
/**/ 	canvasPosition = aVertexPosition;
/**/ 	texturePosition = aTexturePosition;
/**/ }`;

function fragmentShader(algorithm: string) {
	return `/**/ precision highp float;
/**/
/**/ uniform sampler2D uSampler;
/**/ uniform vec2 uSize;
/**/
/**/ varying vec4 canvasPosition;
/**/ varying vec2 texturePosition;
/**/
/**/ vec4 colorAt(float x, float y);

vec4 calculateValue(float x, float y)
{
${algorithm}
}

/**/ void main() {
/**/ 	gl_FragColor = calculateValue(
/**/ 		texturePosition.x * uSize.x, 
/**/ 		texturePosition.y * uSize.y);
/**/ }
/**/
/**/ vec4 colorAt(float x, float y)
/**/ {
/**/ 	return texture2D(uSampler, vec2(x / uSize.x, y / uSize.y));
/**/ }`;
}

export default class Shader {
	public readonly name: string;
	public readonly vertexShaderSource: string;
	public readonly fragmentShaderSource: string;

	constructor(name: string, vertexShaderSource: string, fragmentShaderSource: string) {
		this.name = name;
		this.vertexShaderSource = vertexShaderSource;
		this.fragmentShaderSource = fragmentShaderSource;
	}

	public static get empty() {
		return new Shader(
			"New layer",
			vertexShader,
			fragmentShader('\t// Put your code here\n\t// return colorAt(x, y);')
		)
	}

	public static get identity() {
		return new Shader(
			'Base image',
			vertexShader,
			fragmentShader('\treturn colorAt(x, y);')
		);
	}

	public static get verticalLines() {
		return new Shader(
			'Vertical line detector',
			vertexShader,
			fragmentShader(
				`	vec4 sample1 = colorAt(x - 1.0, y);
	vec4 sample2 = colorAt(x + 1.0, y);

	float diff = abs(sample1.r + sample1.g + sample1.b - sample2.r - sample2.g - sample2.b) / 3.0;

	return vec4(
		diff,
		diff,
		diff,
		1
	);`));
	}

	public static get horizontalLines() {
		return new Shader(
			'Horizontal line detector',
			vertexShader,
			fragmentShader(
				`	vec4 sample1 = colorAt(x, y - 1.0);
	vec4 sample2 = colorAt(x, y + 1.0);

	float diff = abs(sample1.r + sample1.g + sample1.b - sample2.r - sample2.g - sample2.b) / 3.0;

	return vec4(
		diff,
		diff,
		diff,
		1
	);`));
	}
}