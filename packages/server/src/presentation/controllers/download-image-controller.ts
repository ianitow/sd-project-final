import type { DownloadImage } from "../../domain/use-cases/download-image";
import type { Controller } from "../contracts/controller";
import type { SocketResponse } from "../contracts/socket-response";
import type { Validation } from "../contracts/validation";
import { error, ok } from "../helpers/socket-helper";

export class DownloadImageController
	implements Controller<DownloadImageController.Params> {
	constructor(
		private readonly validation: Validation,
		private readonly downloadImage: DownloadImage,
	) { }

	async handle(
		request: DownloadImageController.Params,
	): Promise<SocketResponse> {
		try {
			const errors = this.validation.validate(request);
			if (errors) return error(errors, true);
			const result = await this.downloadImage.downloadImage(request.id);

			return ok(result);
		} catch (err: any) {
			console.log('error', err)
			return error(err.message);
		}
	}
}

export namespace DownloadImageController {
	export type Params = {
		id: string;
	};
}
