import { DbRequestDownloadImage } from "../../../data/use-cases/db-request-download-image";
import { RandomIdNodeProvider } from "../../../infra/providers/random-id-node-provider";
import { ImagesOSRepository } from "../../../infra/repositories/images-os-repository";

export const makeDbRequestDownloadImage = (): DbRequestDownloadImage => {
	const idProvider = new RandomIdNodeProvider();
	const repository = new ImagesOSRepository();
	return new DbRequestDownloadImage(idProvider, repository);
};
