import type { Controller } from "../../../presentation/contracts/controller";
import { ListAllImagesController } from "../../../presentation/controllers/list-all-images-controller";
import { ValidationComposite } from "../../../presentation/validation/validation-composite";
import { makeDbListAllImages } from "../use-cases/list-all-images-factory";

export const makeListAllImagesController = (): Controller => {
	const validations = new ValidationComposite([]);
	return new ListAllImagesController(validations, makeDbListAllImages());
};
