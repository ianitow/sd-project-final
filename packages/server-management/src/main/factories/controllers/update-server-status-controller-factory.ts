import type { Controller } from "../../../presentation/contracts/controller.js";
import { UpdateServerStatusController } from "../../../presentation/controllers/update-server-status-controller.js";
import { RequiredField } from "../../../presentation/validation/required-field.js";
import { ValidServerStatus } from "../../../presentation/validation/valid-server-status.js";
import { ValidationComposite } from "../../../presentation/validation/validation-composite.js";
import { makeDbUpdateServerStatus } from "../usecases/update-server-status-factory.js";

export const makeUpdateServerController = (): Controller => {
	const validations = new ValidationComposite([
		...["serverIp", "status", "serverId"].map(
			(item) => new RequiredField(item),
		),
		new ValidServerStatus("status"),
	]);
	return new UpdateServerStatusController(
		validations,
		makeDbUpdateServerStatus(),
	);
};
