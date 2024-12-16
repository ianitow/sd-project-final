import { FindServersByImageController } from "presentation/controllers/find-servers-by-image-controller.js";
import type { Controller } from "../../../presentation/contracts/controller.js";
import { ValidationComposite } from "../../../presentation/validation/validation-composite.js";
import { makeDbFindServersByImage } from "../usecases/find-servers-by-image-factory.js";


export const makeFindServersByImageController = (): Controller => {
  const validations = new ValidationComposite([]);
  return new FindServersByImageController(validations, makeDbFindServersByImage());
};
