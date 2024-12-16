import type { ListAllImages } from "../../../domain/use-cases/list-all-images";

export interface ListAllImagesRepository {
	listAllImages: () => Promise<ListAllImages.Result>;
}

export interface ListAllImagesPartByIdRepository {
	listAllImagesPartById: (id: string) => Promise<ListAllImages.Result>;
}

export interface CreateImageWriteStreamRepository {
	createImageWriteStream: (id: string, data: string) => Promise<boolean>;
}
export interface CreateImageReadStreamRepository {
	createImageReadStream: (
		fileName: string,
	) => Promise<string>;
}

export interface ListUniqueImagesRepository {
	listUniqueImages: () => Promise<string[]>;
}



export interface DeleteFileRepository {
	deleteFile: (fileName: string) => Promise<boolean>;
}

export interface ImagesRepository
	extends ListAllImagesRepository,
	CreateImageWriteStreamRepository,
	CreateImageReadStreamRepository,
	ListAllImagesPartByIdRepository,
	ListUniqueImagesRepository,
	DeleteFileRepository { }
