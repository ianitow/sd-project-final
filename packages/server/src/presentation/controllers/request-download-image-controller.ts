import type { RequestDownloadImage } from "../../domain/use-cases/request-download-image";
import type { Controller } from "../contracts/controller";
import type { SocketResponse } from "../contracts/socket-response";
import type { Validation } from "../contracts/validation";
import { error, ok } from "../helpers/socket-helper";

export class RequestDownloadImageController
	implements Controller<RequestDownloadImageController.Params>
{
	constructor(
		private readonly validation: Validation,
		private readonly requestDownloadImage: RequestDownloadImage,
	) {}

	async handle(
		request: RequestDownloadImageController.Params,
	): Promise<SocketResponse> {
		try {
			const errors = this.validation.validate(request);
			if (errors) return error(errors, true);

			const result = await this.requestDownloadImage.requestDownloadImage(
				request.filename,
			);

			return ok(result);
		} catch (err: any) {
			return error(err.message);
		}
	}
}

export namespace RequestDownloadImageController {
	export type Params = {
		filename: string;
	};
}
