import { DbListUniqueImages } from "../../../data/use-cases/db-list-unique-images";
import { ImagesOSRepository } from "../../../infra/repositories/images-os-repository";

export const makeDbListUniqueImages = (): DbListUniqueImages => {
	const osRepository = new ImagesOSRepository();
	return new DbListUniqueImages(osRepository);
};
