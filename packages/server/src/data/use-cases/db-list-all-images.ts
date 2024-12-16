import type { ListAllImages } from "../../domain/use-cases/list-all-images";
import type { ListAllImagesRepository } from "../contracts/repositories/images-repository";

export class DbListAllImages implements ListAllImages {
	constructor(
		private readonly listAllImagesRepository: ListAllImagesRepository,
	) {}
	async listAllImages() {
		return await this.listAllImagesRepository.listAllImages();
	}
}
