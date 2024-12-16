import type { ListAllServersStatus } from "../../domain/use-cases/list-all-servers-status.js";
import type { Controller } from "../contracts/controller.js";
import type { SocketResponse } from "../contracts/socket-response.js";
import type { Validation } from "../contracts/validation.js";
import { error, ok } from "../helpers/socket-helper.js";

export class ListAllServersStatusController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly listAllServersStatus: ListAllServersStatus,
	) { }

	async handle(request: any): Promise<SocketResponse> {
		try {
			const errors = this.validation.validate(request);
			if (errors) return error(errors, true);
			const result = await this.listAllServersStatus.listAllServers();
			if (!result) {
				return error("It was not possible to create the server status");
			}
			return ok(result);
		} catch (err: any) {
			return error(err, true);
		}
	}
}
