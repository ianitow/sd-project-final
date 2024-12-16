import type { Controller } from "../../../presentation/contracts/controller.js";
import { ListAllImagesFromServersController } from "../../../presentation/controllers/list-all-images-controller.js";
import { ValidationComposite } from "../../../presentation/validation/validation-composite.js";
import { makeDbListAllImagesFromServer } from "../usecases/list-all-images-from-servers.js";

export const makeListAllImagesFromServersController = (): Controller => {
	const validations = new ValidationComposite([]);
	return new ListAllImagesFromServersController(
		validations,
		makeDbListAllImagesFromServer(),
	);
};
