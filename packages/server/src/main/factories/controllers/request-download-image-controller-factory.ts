import type { Controller } from "../../../presentation/contracts/controller";
import { RequestDownloadImageController } from "../../../presentation/controllers/request-download-image-controller";
import { ValidationComposite } from "../../../presentation/validation/validation-composite";
import { makeDbRequestDownloadImage } from "../use-cases/request-download-image-factory";

export const makeRequestDownloadImage = (): Controller => {
	const validations = new ValidationComposite([]);
	return new RequestDownloadImageController(
		validations,
		makeDbRequestDownloadImage(),
	);
};
