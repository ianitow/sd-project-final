import type { DeleteImage } from "../../domain/use-cases/delete-image";
import type { DeleteFileRepository } from "../contracts/repositories/images-repository";

export class DbDeleteImage implements DeleteImage {
	constructor(private readonly imageRepository: DeleteFileRepository) {}

	async deleteImage(filename: string): Promise<boolean> {
		return await this.imageRepository.deleteFile(filename);
	}
}
