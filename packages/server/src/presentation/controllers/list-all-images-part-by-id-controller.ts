import type { ListAllImagesPartById } from "../../domain/use-cases/list-all-images-part-by-id";
import type { Controller } from "../contracts/controller";
import type { SocketResponse } from "../contracts/socket-response";
import type { Validation } from "../contracts/validation";
import { error, ok } from "../helpers/socket-helper";

export class ListAllImagesPartByIdController
  implements Controller<ListAllImagesPartByIdController.Params> {
  constructor(
    private readonly validation: Validation,
    private readonly listAllImagesPartById: ListAllImagesPartById,
  ) { }

  async handle(
    request: ListAllImagesPartByIdController.Params,
  ): Promise<SocketResponse> {
    try {
      const errors = this.validation.validate(request);
      if (errors) return error(errors, true);

      const result = await this.listAllImagesPartById.listAllImagesPartById(
        request.id,
      );
      return ok(result);
    } catch (err: any) {
      return error(err.message);
    }
  }
}

export namespace ListAllImagesPartByIdController {
  export type Params = {
    id: string;
  };
}
