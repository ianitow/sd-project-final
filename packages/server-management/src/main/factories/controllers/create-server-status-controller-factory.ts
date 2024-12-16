import type { Controller } from "../../../presentation/contracts/controller.js";
import { CreateServerStatusController } from "../../../presentation/controllers/create-server-status-controller.js";
import { RequiredField } from "../../../presentation/validation/required-field.js";
import { ValidServerStatus } from "../../../presentation/validation/valid-server-status.js";
import { ValidationComposite } from "../../../presentation/validation/validation-composite.js";
import { makeDbCreateServerStatus } from "../usecases/create-server-status-factory.js";

export const makeCreateServerStatusController = (): Controller => {
	const validations = new ValidationComposite([
		...["serverIp", "status", "serverId"].map(
			(item) => new RequiredField(item),
		),
		new ValidServerStatus("status"),
	]);
	return new CreateServerStatusController(
		validations,
		makeDbCreateServerStatus(),
	);
};
