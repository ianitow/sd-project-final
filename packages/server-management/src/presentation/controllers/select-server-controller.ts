import type { SelectServer } from "../../domain/use-cases/select-server.js";
import type { Controller } from "../contracts/controller.js";
import type { SocketResponse } from "../contracts/socket-response.js";
import type { Validation } from "../contracts/validation.js";
import { error, ok } from "../helpers/socket-helper.js";

export class SelectServerController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly selectServer: SelectServer,
	) { }

	async handle(request: { number: number }): Promise<SocketResponse> {
		try {
			const errors = this.validation.validate(request);
			if (errors) return error(errors, true);
			console.log('request', request)
			const result = await this.selectServer.selectServer(request.number);

			if (!result) {
				return error("It was not possible to select a server");
			}
			return ok(result);
		} catch (error: any) {
			return error(error.message);
		}
	}
}
