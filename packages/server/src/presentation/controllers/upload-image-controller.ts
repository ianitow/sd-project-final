import type { UploadImage } from "../../domain/use-cases/upload-image";
import type { Controller } from "../contracts/controller";
import type { SocketResponse } from "../contracts/socket-response";
import type { Validation } from "../contracts/validation";
import { error, ok } from "../helpers/socket-helper";

export class UploadImageController
	implements Controller<UploadImageController.Params> {
	constructor(
		private readonly validation: Validation,
		private readonly uploadImage: UploadImage,
	) { }

	async handle(request: UploadImageController.Params): Promise<SocketResponse> {
		try {
			const errors = this.validation.validate(request);
			if (errors) return error(errors, true);
			console.log('aquixx', request.id)
			const result = await this.uploadImage.uploadImage({
				id: request.id,
				data: request.data,
			});
			return ok(result);
		} catch (err: any) {
			return error(err.message);
		}
	}
}

export namespace UploadImageController {
	export type Params = {
		id: string;
		data: string;
	};
}
