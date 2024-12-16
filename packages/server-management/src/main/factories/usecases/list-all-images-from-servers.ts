import { ImagesMemoryRepository } from "infra/db/memory/images-memory-repository.js";
import { DbListAllImagesFromServers } from "../../../data/use-cases/db-list-all-images-from-servers.js";

export const makeDbListAllImagesFromServer = (): DbListAllImagesFromServers => {

	const memoryDb = new ImagesMemoryRepository();
	return new DbListAllImagesFromServers(memoryDb);
};
