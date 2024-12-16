import type { Controller } from "../../../presentation/contracts/controller";
import { ListAllImagesPartByIdController } from "../../../presentation/controllers/list-all-images-part-by-id-controller";
import { ValidationComposite } from "../../../presentation/validation/validation-composite";
import { makeDbListAllImagesPartById } from "../use-cases/list-all-images-part-by-id-factory";

export const makeListAllImagesPartByIdController = (): Controller => {
	const validations = new ValidationComposite([]);
	return new ListAllImagesPartByIdController(validations, makeDbListAllImagesPartById());
};
