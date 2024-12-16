import type { ListUniqueImages } from "../../domain/use-cases/list-unique-images";
import type {
  ImagesRepository
} from "../contracts/repositories/images-repository";

export class DbListUniqueImages implements ListUniqueImages {
  constructor(private readonly listUniqueImagesRepository: ImagesRepository) { }
  async listUniqueImages(): Promise<string[]> {
    return await this.listUniqueImagesRepository.listUniqueImages();
  }
}
