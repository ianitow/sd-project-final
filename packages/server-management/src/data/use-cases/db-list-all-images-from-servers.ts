import type { ListAllImagesRepository } from "data/contracts/repos/images-repository.js";
import type { ListAllImagesFromServers } from "../../domain/use-cases/list-all-images-from-servers.js";

export class DbListAllImagesFromServers implements ListAllImagesFromServers {
	constructor(private readonly listAllImagesRepository: ListAllImagesRepository) { }
	async listAllImages(): Promise<string[]> {
		return await this.listAllImagesRepository.listAllImages()
	};

}
