import RasterImage from "./RasterImage";

function setUrlSource(image: HTMLImageElement, source: string) {
	image.src = source;
}

function setFileSource(image: HTMLImageElement, source: File) {
	var reader = new FileReader();

	reader.onload = (event: any) => {
		image.src = event.target.result;
	};

	reader.readAsDataURL(source);
}

export default function loadImage(source: string | File): Promise<RasterImage> {
	return new Promise<RasterImage>((resolve, reject) => {
		var image = new Image;
		image.crossOrigin = 'Anonymous';
		image.onload = () => {
			const rasterImage = new RasterImage;
			rasterImage.load(image);
			resolve(rasterImage);
		};
		image.onerror = reject;

		if (typeof source == 'string')
			setUrlSource(image, source);
		else
			setFileSource(image, source);
	});
}