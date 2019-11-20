import { throwError } from "../../utils/exceptions";

export default function loadTexture(context: WebGLRenderingContext, program: WebGLProgram, image: ImageData, sampler: string): WebGLTexture {
	const texture = context.createTexture() || throwError<WebGLTexture>("Cannot load the texture");

	context.bindTexture(context.TEXTURE_2D, texture);

	context.bindTexture(context.TEXTURE_2D, texture);
	context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image);
	context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
	context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
	context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);

	context.activeTexture(context.TEXTURE0);
	context.bindTexture(context.TEXTURE_2D, texture);
	context.uniform1i(context.getUniformLocation(program, sampler), 0);

	return texture;
}