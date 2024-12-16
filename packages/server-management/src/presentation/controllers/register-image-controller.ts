import type { RegisterImage } from "domain/use-cases/register-image.js";
import type { Controller } from "../contracts/controller.js";
import type { SocketResponse } from "../contracts/socket-response.js";
import type { Validation } from "../contracts/validation.js";
import { error, ok } from "../helpers/socket-helper.js";

export class RegisterImageController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly registerImage: RegisterImage,
  ) { }

  async handle(
    request: RegisterImageController.Request,
  ): Promise<SocketResponse> {
    try {
      const errors = this.validation.validate(request);
      if (errors) return error(errors, true);
      console.log("request", request);
      const result = await this.registerImage.registerImage(
        request.filename,
        request.servers,
      );

      if (!result) {
        return error("It was not possible to register the image");
      }
      return ok(result);
    } catch (error: any) {
      return error(error.message);
    }
  }
}

export namespace RegisterImageController {
  export type Request = {
    filename: string;
    servers: string[];
  };
}
