import type { ListAllImagesPartById } from "../../domain/use-cases/list-all-images-part-by-id";
import type { ListAllImagesPartByIdRepository } from "../contracts/repositories/images-repository";

export class DbListAllImagesPartById implements ListAllImagesPartById {
  constructor(
    private readonly listAllImagesPartByIdRepository: ListAllImagesPartByIdRepository,
  ) { }

  async listAllImagesPartById(id: string) {
    const result = this.listAllImagesPartByIdRepository.listAllImagesPartById(id);
    return await result
  }
}
