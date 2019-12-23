import Shader from "../image-processing/Shader";

export function serializeShaders(shaders: Shader[]): string {
	return JSON.stringify(shaders);
}

export function deserializeShaders(content: string): Shader[] {
	return JSON.parse(content);
}