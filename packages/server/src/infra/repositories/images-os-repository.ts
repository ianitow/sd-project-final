import fs from "node:fs";
import path from "node:path";
import type { ImagesRepository } from "../../data/contracts/repositories/images-repository";
import type { ListAllImages } from "../../domain/use-cases/list-all-images";
export const MAX_FILE_SIZE = 1024 * 64
export const __dirname = import.meta.dirname;
const dirPath = path.join(__dirname, 'storage',
	process.env.SERVER_ID);



export class ImagesOSRepository implements ImagesRepository {
	listUniqueImages(): Promise<string[]> {
		const files = fs.readdirSync(dirPath)
		const uniqueFiles = [...new Set(files.map(file => file.split('.sf')[0]))].filter(file => file !== undefined)
		if (!uniqueFiles.length) return Promise.resolve([])

		return Promise.resolve(uniqueFiles)
	}
	listAllImagesPartById(filename: string): Promise<ListAllImages.Result> {
		const files = fs.readdirSync(dirPath)
		const filteredFiles = files.filter(file => file.startsWith(`${filename}.sf`));

		return Promise.resolve(filteredFiles)
	}

	async deleteFile(filename: string): Promise<boolean> {
		const files = fs.readdirSync(dirPath)
		const filteredFiles = files.filter(file => file.startsWith(`${filename}.sf`));

		if (filteredFiles.length === 0) {
			return false;
		}
		const deletePromises = filteredFiles.map(async (file) => {
			const filePath = path.join(dirPath, file); // Cria o caminho completo do arquivo
			fs.unlinkSync(filePath);
		});

		await Promise.all(deletePromises);

		return true;
	};


	async createImageWriteStream(id: string, data: string): Promise<boolean> {
		if (!process.env.SERVER_ID) {
			throw new Error('SERVER_ID not found')
		}
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true });
		}
		console.log(dirPath)
		return new Promise((resolve, reject) => {
			fs.writeFileSync(path.join(dirPath, id), data)
			resolve(true)
		});
	}
	async createImageReadStream(
		imageName: string,
	): Promise<string> {
		return new Promise((resolve, reject) => {
			fs.readFile(path.join(dirPath, imageName), 'utf8', (err, data) => {
				if (err) {
					reject(`Erro ao ler o arquivo: ${err.message}`);
					return;
				}
				resolve(data);
			});
		});
	}
	async listAllImages(): Promise<ListAllImages.Result> {
		try {
			const files = fs.readdirSync(
				path.join(__dirname, "storage", process.env.SERVER_ID),
			).map((file) => file.split('.sf')[0]);

			return files;
		} catch (err) {
			console.error(`Erro ao listar diretório: ${err.message}`);
			return [];
		}
	}
}
