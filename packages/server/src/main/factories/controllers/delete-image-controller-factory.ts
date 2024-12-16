import type { Controller } from "../../../presentation/contracts/controller";
import { DeleteImageController } from "../../../presentation/controllers/delete-image-controller";
import { RequiredField } from "../../../presentation/validation/required-field";
import { ValidationComposite } from "../../../presentation/validation/validation-composite";
import { makeDbDeleteImage } from "../use-cases/delete-image-factory";

export const makeDeleteImageController = (): Controller => {
	const validations = new ValidationComposite([
		...["filename"].map((item) => new RequiredField(item)),
	]);
	return new DeleteImageController(validations, makeDbDeleteImage());
};
