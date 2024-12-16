import { DbRegisterImage } from "data/use-cases/db-register-image.js";
import { ImagesMemoryRepository } from "infra/db/memory/images-memory-repository.js";

export const makeDbRegisterImage = (): DbRegisterImage => {
  const memoryDb = new ImagesMemoryRepository();
  return new DbRegisterImage(memoryDb);
};
