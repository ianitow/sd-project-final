import type { Controller } from "../../../presentation/contracts/controller.js";
import { ListAllServersStatusController } from "../../../presentation/controllers/list-all-servers-controller.js";
import { ValidationComposite } from "../../../presentation/validation/validation-composite.js";
import { makeDbListAllServersStatus } from "../usecases/list-all-servers-status-factory.js";

export const makeListAllServersStatus = (): Controller => {
	const validations = new ValidationComposite([]);
	return new ListAllServersStatusController(
		validations,
		makeDbListAllServersStatus(),
	);
};
