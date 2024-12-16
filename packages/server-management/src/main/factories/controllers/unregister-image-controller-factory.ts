import { UnregisterImageController } from "presentation/controllers/unregister-image-controller.js";
import type { Controller } from "../../../presentation/contracts/controller.js";
import { ValidationComposite } from "../../../presentation/validation/validation-composite.js";
import { makeDbUnregisterImage } from "../usecases/unregister-image-factory.js";


export const makeUnregisterImageController = (): Controller => {
  const validations = new ValidationComposite([]);
  return new UnregisterImageController(validations, makeDbUnregisterImage());
};
