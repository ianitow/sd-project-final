import type { DownloadImage } from "../../domain/use-cases/download-image";
import type {
	CreateImageReadStreamRepository
} from "../contracts/repositories/images-repository";

export class DbDownloadImage implements DownloadImage {
	constructor(
		private readonly imageRepository: CreateImageReadStreamRepository
	) { }

	async downloadImage(filename: string): Promise<DownloadImage.Result> {
		return await this.imageRepository.createImageReadStream(filename);
	}
}
