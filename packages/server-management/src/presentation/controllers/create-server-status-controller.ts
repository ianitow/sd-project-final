import type { ServerStatusEnum } from "../../domain/entities/server-status-enum.js";
import type { CreateServerStatus } from "../../domain/use-cases/create-server-status.js";
import type { Controller } from "../contracts/controller.js";
import type { SocketResponse } from "../contracts/socket-response.js";
import type { Validation } from "../contracts/validation.js";
import { error, ok } from "../helpers/socket-helper.js";

export class CreateServerStatusController
	implements Controller<CreateServerStatusController.Params> {
	constructor(
		private readonly validation: Validation,
		private readonly createServerStatus: CreateServerStatus,
	) { }

	async handle(
		request: CreateServerStatusController.Params,
	): Promise<SocketResponse> {
		try {
			const errors = this.validation.validate(request);
			if (errors) return error(errors, true);
			const result = await this.createServerStatus.createServerStatus(request);
			if (!result) {
				return error("It was not possible to create the server status");
			}
			return ok(result);
		} catch (err: any) {
			return error(err, true);
		}
	}
}

export namespace CreateServerStatusController {
	export type Params = {
		serverIp: string;
		serverId: string;
		status: ServerStatusEnum;
	};
}
