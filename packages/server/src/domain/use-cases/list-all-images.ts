export interface ListAllImages {
	listAllImages: () => Promise<ListAllImages.Result>;
}
export namespace ListAllImages {
	export type Result = string[] | null;
}
