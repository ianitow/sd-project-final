import type { Controller } from "../../../presentation/contracts/controller";
import { RequestUploadImageController } from "../../../presentation/controllers/request-upload-image-controller";
import { ValidationComposite } from "../../../presentation/validation/validation-composite";
import { makeDbRequestUploadImage } from "../use-cases/request-upload-image-factory";

export const makeRequestUploadImageController = (): Controller => {
	const validations = new ValidationComposite([]);
	return new RequestUploadImageController(
		validations,
		makeDbRequestUploadImage(),
	);
};
