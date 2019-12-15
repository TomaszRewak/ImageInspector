import RasterImage from "../../lib/RasterImage";
import Shader from "../Shader";
import { throwError } from "../../utils/exceptions";
import linkProgram from "./ProgramLinker";
import bindBuffer from "./BufferBinder";
import loadTexture from "./TextureLoader";

export default function renderImage(gl: WebGLRenderingContext, image: RasterImage, shader: Shader)
{
	const program = gl.createProgram() || throwError<WebGLProgram>('Cannot create program');
	const vertexBuffer = gl.createBuffer() || throwError<WebGLBuffer>('Cannot create buffer');
	const textureCoordinatesBuffer = gl.createBuffer() || throwError<WebGLBuffer>('Cannot create buffer');

	try
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,
			new Float32Array([
				-1.0, 1.0,
				1.0, 1.0,
				-1.0, -1.0,
				1.0, -1.0,
			]),
			gl.STATIC_DRAW);
	
		gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinatesBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,
			new Float32Array([
				0.0, 0.0,
				1.0, 0.0,
				0.0, 1.0,
				1.0, 1.0,
			]),
			gl.STATIC_DRAW);
	
		linkProgram(gl, program, shader);
	
		gl.viewport(0, 0, image.width, image.height);	
		gl.clearColor(0.0, 0.0, 0.0, 1.0);	
		gl.clear(gl.COLOR_BUFFER_BIT);	
		gl.useProgram(program);
		
		gl.uniform2f(gl.getUniformLocation(program, 'uSize'), image.width, image.height);
	
		bindBuffer(gl, program, vertexBuffer, 'aVertexPosition');
		bindBuffer(gl, program, textureCoordinatesBuffer, 'aTexturePosition');
	
		const texture = loadTexture(gl, program, image.imageData, 'uSampler');
	
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		gl.deleteTexture(texture);
	}
	finally
	{
		if (vertexBuffer)
			gl.deleteBuffer(vertexBuffer);
		if (textureCoordinatesBuffer)
			gl.deleteBuffer(textureCoordinatesBuffer);
		if (program)
			gl.deleteProgram(program);
	}
}