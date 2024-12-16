import type { ListAllImages } from "../../domain/use-cases/list-all-images";
import type { Controller } from "../contracts/controller";
import type { SocketResponse } from "../contracts/socket-response";
import type { Validation } from "../contracts/validation";
import { error, ok } from "../helpers/socket-helper";

export class ListAllImagesController
	implements Controller<ListAllImagesController.Params>
{
	constructor(
		private readonly validation: Validation,
		private readonly listAllImages: ListAllImages,
	) {}

	async handle(
		request: ListAllImagesController.Params,
	): Promise<SocketResponse> {
		try {
			const errors = this.validation.validate(request);
			if (errors) return error(errors, true);
			const result = await this.listAllImages.listAllImages();
			return ok(result);
		} catch (err: any) {
			return error(err.message);
		}
	}
}

export namespace ListAllImagesController {
	export type Params = {
		serverId: string;
		status: string;
	};
}
