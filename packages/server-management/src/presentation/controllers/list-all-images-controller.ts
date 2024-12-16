import type { ListAllImagesFromServers } from "../../domain/use-cases/list-all-images-from-servers.js";
import type { Controller } from "../contracts/controller.js";
import type { SocketResponse } from "../contracts/socket-response.js";
import type { Validation } from "../contracts/validation.js";
import { error, ok } from "../helpers/socket-helper.js";
import type { CreateServerStatusController } from "./create-server-status-controller.js";

export class ListAllImagesFromServersController
	implements Controller<CreateServerStatusController.Params> {
	constructor(
		private readonly validation: Validation,
		private readonly listAllImages: ListAllImagesFromServers,
	) { }

	async handle(request: any): Promise<SocketResponse> {
		try {
			const errors = this.validation.validate(request);
			if (errors) return error(errors, true);
			const result = await this.listAllImages.listAllImages();
			if (!result) {
				return error("It was not possible to create the server status");
			}

			return ok(result);
		} catch (err: any) {
			return error(err, true);
		}
	}
}
