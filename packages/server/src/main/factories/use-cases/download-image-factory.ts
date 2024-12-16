import { DbDownloadImage } from "../../../data/use-cases/db-download-image";
import { ImagesOSRepository } from "../../../infra/repositories/images-os-repository";

export const makeDbDownloadImage = (): DbDownloadImage => {
	const osRepository = new ImagesOSRepository();
	return new DbDownloadImage(osRepository);
};
