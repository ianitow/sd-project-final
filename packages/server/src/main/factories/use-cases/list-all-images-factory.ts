import { DbListAllImages } from "../../../data/use-cases/db-list-all-images";
import { ImagesOSRepository } from "../../../infra/repositories/images-os-repository";

export const makeDbListAllImages = (): DbListAllImages => {
	const osRepository = new ImagesOSRepository();
	return new DbListAllImages(osRepository);
};
