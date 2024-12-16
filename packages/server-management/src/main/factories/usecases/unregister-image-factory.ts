import { DbUnregisterImage } from "data/use-cases/db-unregister-image.js";
import { ImagesMemoryRepository } from "infra/db/memory/images-memory-repository.js";

export const makeDbUnregisterImage = (): DbUnregisterImage => {
  const memoryDb = new ImagesMemoryRepository();
  return new DbUnregisterImage(memoryDb);
};
