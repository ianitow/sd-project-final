export interface DeleteImage {
	deleteImage: (fileName: string) => Promise<DeleteImage.Result>;
}
export namespace DeleteImage {
	export type Result = boolean;
}
