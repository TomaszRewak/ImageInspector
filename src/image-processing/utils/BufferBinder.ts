export default function bindBuffer(context: WebGLRenderingContext, program: WebGLProgram, buffer: WebGLBuffer, attribute: string) {
	const attributeLocation = context.getAttribLocation(program, attribute);

	context.bindBuffer(context.ARRAY_BUFFER, buffer);
	context.vertexAttribPointer(attributeLocation, 2, context.FLOAT, false, 0, 0);
	context.enableVertexAttribArray(attributeLocation);
}