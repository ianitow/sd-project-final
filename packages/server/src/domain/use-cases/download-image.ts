
export interface DownloadImage {
	downloadImage: (id: string) => Promise<DownloadImage.Result>;
}
export namespace DownloadImage {
	export type Result = string;
}
