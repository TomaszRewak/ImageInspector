export default function loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
	const shader = gl.createShader(type);

	if (shader == null) throw Error();

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
		throw Error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));

	return shader;
}