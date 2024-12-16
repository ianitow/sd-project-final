import type { DeleteImage } from "../../domain/use-cases/delete-image";
import type { Controller } from "../contracts/controller";
import type { SocketResponse } from "../contracts/socket-response";
import type { Validation } from "../contracts/validation";
import { error, ok } from "../helpers/socket-helper";

export class DeleteImageController
	implements Controller<DeleteImageController.Params>
{
	constructor(
		private readonly validation: Validation,
		private readonly deleteImage: DeleteImage,
	) {}

	async handle(request: DeleteImageController.Params): Promise<SocketResponse> {
		try {
			const errors = this.validation.validate(request);
			if (errors) return error(errors, true);
			const result = await this.deleteImage.deleteImage(request.filename);
			return ok(result);
		} catch (err: any) {
			return error(err.message);
		}
	}
}

export namespace DeleteImageController {
	export type Params = {
		filename: string;
	};
}
