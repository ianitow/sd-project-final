import type { UploadImage } from "../../domain/use-cases/upload-image";
import type {
	ImagesRepository
} from "../contracts/repositories/images-repository";

export class DbUploadImage implements UploadImage {
	constructor(
		private readonly imageRepository: ImagesRepository,
	) { }
	async uploadImage(data: UploadImage.Params): Promise<UploadImage.Result> {
		const writeStream = await this.imageRepository.createImageWriteStream(
			data.id, data.data)

		return writeStream
	}
}
