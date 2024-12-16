import type { ImagesRepository } from "data/contracts/repos/images-repository.js";
import type { UnregisterImage } from "domain/use-cases/unregister-image.js";

export class DbUnregisterImage implements UnregisterImage {
  constructor(private readonly imagesRepository: ImagesRepository) { }

  async unregisterImage(
    imageId: string,
    servers?: string[],
  ): Promise<UnregisterImage.Result> {
    return await this.imagesRepository.unregisterImage(imageId, servers);
  }
}
