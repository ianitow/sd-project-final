import type { FindServersByImage } from "domain/use-cases/find-servers-by-image.js";
import type { Controller } from "../contracts/controller.js";
import type { SocketResponse } from "../contracts/socket-response.js";
import type { Validation } from "../contracts/validation.js";
import { error, ok } from "../helpers/socket-helper.js";

export class FindServersByImageController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly findServersByImage: FindServersByImage,
  ) { }

  async handle(request: { filename: string }): Promise<SocketResponse> {
    try {
      const errors = this.validation.validate(request);
      if (errors) return error(errors, true);

      const result = await this.findServersByImage.findServersByImage(
        request.filename,
      );

      if (!result) {
        return ok([]);
      }
      return ok(result);
    } catch (error: any) {
      console.log(error)
      return error(error.message);
    }
  }
}
