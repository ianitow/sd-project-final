import type { ListUniqueImages } from "../../domain/use-cases/list-unique-images";
import type { Controller } from "../contracts/controller";
import type { SocketResponse } from "../contracts/socket-response";
import type { Validation } from "../contracts/validation";
import { error, ok } from "../helpers/socket-helper";

export class ListUniqueImagesController implements Controller {
	constructor(
		private readonly validation: Validation,
		private readonly listUniqueImages: ListUniqueImages,
	) { }

	async handle(request): Promise<SocketResponse> {
		try {
			const errors = this.validation.validate(request);
			if (errors) return error(errors, true);
			const result = await this.listUniqueImages.listUniqueImages();
			return ok(result);
		} catch (err: any) {
			return error(err.message);
		}
	}
}
