import { DbFindServersByImage } from "data/use-cases/db-find-servers-by-image.js";
import { ImagesMemoryRepository } from "infra/db/memory/images-memory-repository.js";
import { ServerStatusMemoryRepository } from "infra/db/memory/server-status-memory-repository.js";

export const makeDbFindServersByImage = (): DbFindServersByImage => {
  const memoryDb = new ImagesMemoryRepository();
  const serversDb = new ServerStatusMemoryRepository()
  return new DbFindServersByImage(serversDb, memoryDb);
};
