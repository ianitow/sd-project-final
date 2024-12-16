export interface ListAllImagesPartById {
	listAllImagesPartById: (id: string) => Promise<ListAllImagesPartById.Result>;
}
export namespace ListAllImagesPartById {
	export type Result = string[] | null;
}
