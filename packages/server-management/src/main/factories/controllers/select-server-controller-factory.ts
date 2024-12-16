import type { Controller } from "../../../presentation/contracts/controller.js";
import { SelectServerController } from "../../../presentation/controllers/select-server-controller.js";
import { ValidationComposite } from "../../../presentation/validation/validation-composite.js";
import { makeDbSelectServer } from "../usecases/select-server-factory.js";

export const makeSelectServerController = (): Controller => {
	const validations = new ValidationComposite([]);
	return new SelectServerController(validations, makeDbSelectServer());
};
