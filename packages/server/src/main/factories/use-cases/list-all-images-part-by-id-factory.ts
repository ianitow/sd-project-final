import { DbListAllImagesPartById } from "../../../data/use-cases/db-list-all-images-part-by-id";
import { ImagesOSRepository } from "../../../infra/repositories/images-os-repository";

export const makeDbListAllImagesPartById = (): DbListAllImagesPartById => {
  const osRepository = new ImagesOSRepository();
  return new DbListAllImagesPartById(osRepository);
};
