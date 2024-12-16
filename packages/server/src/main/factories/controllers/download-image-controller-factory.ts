import type { Controller } from "../../../presentation/contracts/controller";
import { DownloadImageController } from "../../../presentation/controllers/download-image-controller";
import { RequiredField } from "../../../presentation/validation/required-field";
import { ValidationComposite } from "../../../presentation/validation/validation-composite";
import { makeDbDownloadImage } from "../use-cases/download-image-factory";

export const makeDownloadImageController = (): Controller => {
	const validations = new ValidationComposite([
		...["id"].map((item) => new RequiredField(item)),
	]);
	return new DownloadImageController(validations, makeDbDownloadImage());
};
