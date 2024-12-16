import type { RequestUploadImage } from "../../domain/use-cases/request-upload-image";
import type { Controller } from "../contracts/controller";
import type { SocketResponse } from "../contracts/socket-response";
import type { Validation } from "../contracts/validation";
import { error, ok } from "../helpers/socket-helper";

export class RequestUploadImageController
	implements Controller<RequestUploadImageController.Params>
{
	constructor(
		private readonly validation: Validation,
		private readonly requestUploadImage: RequestUploadImage,
	) {}

	async handle(
		request: RequestUploadImageController.Params,
	): Promise<SocketResponse> {
		try {
			const errors = this.validation.validate(request);
			if (errors) return error(errors, true);
			const result = await this.requestUploadImage.requestUploadImage();
			return ok(result);
		} catch (err: any) {
			return error(err.message);
		}
	}
}

export namespace RequestUploadImageController {
	export type Params = {};
}
