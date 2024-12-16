import { DbDeleteImage } from "../../../data/use-cases/db-delete-image";
import { ImagesOSRepository } from "../../../infra/repositories/images-os-repository";

export const makeDbDeleteImage = (): DbDeleteImage => {
	const imageRepository = new ImagesOSRepository();
	return new DbDeleteImage(imageRepository);
};
