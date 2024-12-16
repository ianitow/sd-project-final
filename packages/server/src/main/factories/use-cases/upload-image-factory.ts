import { DbUploadImage } from "../../../data/use-cases/db-upload-image";
import { ImagesOSRepository } from "../../../infra/repositories/images-os-repository";

export const makeDbUploadImage = (): DbUploadImage => {
	const osRepository = new ImagesOSRepository();
	return new DbUploadImage(osRepository);
};
