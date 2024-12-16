import type { Controller } from "../../../presentation/contracts/controller";
import { UploadImageController } from "../../../presentation/controllers/upload-image-controller";
import { RequiredField } from "../../../presentation/validation/required-field";
import { ValidationComposite } from "../../../presentation/validation/validation-composite";
import { makeDbUploadImage } from "../use-cases/upload-image-factory";

export const makeUploadImageController = (): Controller => {
	const validations = new ValidationComposite([
		...["id", "data"].map((item) => new RequiredField(item)),
	]);
	return new UploadImageController(validations, makeDbUploadImage());
};
