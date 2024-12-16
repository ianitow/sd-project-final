import { RegisterImageController } from "presentation/controllers/register-image-controller.js";
import type { Controller } from "../../../presentation/contracts/controller.js";
import { ValidationComposite } from "../../../presentation/validation/validation-composite.js";
import { makeDbRegisterImage } from "../usecases/register-image-factory.js";


export const makeRegisterImageController = (): Controller => {
  const validations = new ValidationComposite([]);
  return new RegisterImageController(validations, makeDbRegisterImage());
};
