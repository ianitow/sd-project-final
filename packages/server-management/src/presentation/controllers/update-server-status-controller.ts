import type { ServerStatusEnum } from "../../domain/entities/server-status-enum.js";
import type { UpdateServerStatus } from "../../domain/use-cases/update-server-status.js";
import type { Controller } from "../contracts/controller.js";
import type { SocketResponse } from "../contracts/socket-response.js";
import type { Validation } from "../contracts/validation.js";
import { error, ok } from "../helpers/socket-helper.js";

export class UpdateServerStatusController
	implements Controller<UpdateServerStatusController.Params> {
	constructor(
		private readonly validation: Validation,
		private readonly updateServerStatus: UpdateServerStatus,
	) { }

	async handle(
		request: UpdateServerStatusController.Params,
	): Promise<SocketResponse> {
		try {
			const errors = this.validation.validate(request);
			if (errors) return error(errors, true);
			const result = await this.updateServerStatus.updateServerStatus({
				serverId: request.serverId,
				status: request.status,
				serverIp: request.serverIp,
			});
			if (!result) {
				return error("It was not possible to update the server status");
			}
			return ok(result);
		} catch (error: any) {
			return error(error.message);
		}
	}
}

export namespace UpdateServerStatusController {
	export type Params = {
		serverId: string;
		serverIp: string;
		status: ServerStatusEnum;
	};
}
