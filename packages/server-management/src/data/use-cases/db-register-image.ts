import type { ImagesRepository } from "data/contracts/repos/images-repository.js";
import type { RegisterImage } from "domain/use-cases/register-image.js";

export class DbRegisterImage implements RegisterImage {
  constructor(private readonly imagesRepository: ImagesRepository) { }

  async registerImage(
    imageId: string,
    servers: string[],
  ): Promise<RegisterImage.Result> {
    return await this.imagesRepository.registerImage(imageId, servers);
  }
}
