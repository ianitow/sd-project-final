import type { UnregisterImage } from "domain/use-cases/unregister-image.js";
import type { Controller } from "../contracts/controller.js";
import type { SocketResponse } from "../contracts/socket-response.js";
import type { Validation } from "../contracts/validation.js";
import { error, ok } from "../helpers/socket-helper.js";

export class UnregisterImageController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly registerImage: UnregisterImage,
  ) { }

  async handle(
    request: UnregisterImageController.Request,
  ): Promise<SocketResponse> {
    try {
      const errors = this.validation.validate(request);
      if (errors) return error(errors, true);
      console.log("request", request);
      const result = await this.registerImage.unregisterImage(
        request.filename,
        request.servers,
      );

      if (!result) {
        return error("It was not possible to unregister the image");
      }
      return ok(result);
    } catch (error: any) {
      return error(error.message);
    }
  }
}

export namespace UnregisterImageController {
  export type Request = {
    filename: string;
    servers?: string[];
  };
}
