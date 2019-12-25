export default function loadFileContent(file: File): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		var reader = new FileReader();
		reader.onload = () => {
			const result = reader.result;

			if (typeof result == 'string')
				resolve(result);
			else
				reject();
		};
		reader.onerror = reject;

		reader.readAsText(file);
	});
}