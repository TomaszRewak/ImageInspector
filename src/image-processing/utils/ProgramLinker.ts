import Shader from "../Shader";
import loadShader from "./ShaderLoader";

export default function linkProgram(context: WebGLRenderingContext, program: WebGLProgram, shader: Shader) {
	const vertexShader = loadShader(context, context.VERTEX_SHADER, shader.vertexShaderSource);
	const fragmentShader = loadShader(context, context.FRAGMENT_SHADER, shader.fragmentShaderSource);

	context.attachShader(program, vertexShader);
	context.attachShader(program, fragmentShader);
	context.linkProgram(program);

	if (!context.getProgramParameter(program, context.LINK_STATUS))
		throw Error(`Unable to initialize the shader program: ${context.getProgramInfoLog(program)}`);
}