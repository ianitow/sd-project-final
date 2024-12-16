import type { Controller } from "../../../presentation/contracts/controller";
import { ListUniqueImagesController } from "../../../presentation/controllers/list-unique-images-controller";
import { ValidationComposite } from "../../../presentation/validation/validation-composite";
import { makeDbListUniqueImages } from "../use-cases/list-unique-images-factory";

export const makeListUniqueImagesController = (): Controller => {
	const validations = new ValidationComposite([]);
	return new ListUniqueImagesController(validations, makeDbListUniqueImages());
};
