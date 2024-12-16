import type { net } from "node:net";
import { makeDeleteImageController } from "../factories/controllers/delete-image-controller-factory";
import { makeDownloadImageController } from "../factories/controllers/download-image-controller-factory";
import { makeListAllImagesController } from "../factories/controllers/list-all-images-controller-factory";
import { makeRequestDownloadImage } from "../factories/controllers/request-download-image-controller-factory";
import { makeRequestUploadImageController } from "../factories/controllers/request-upload-image-controller-factory";
import { makeUploadImageController } from "../factories/controllers/upload-image-controller-factory";
export const listAllImagesRoute = async (socket: net.Socket, data: any) => {
	const controller = makeListAllImagesController();
	const result = await controller.handle(data);
	socket.write(`${JSON.stringify(result)}\n`);
	return result;
};

export const requestDownloadImageRoute = async (
	socket: net.Socket,
	buffer: any,
) => {
	const controller = makeRequestDownloadImage();
	const [filename] = buffer.split("#");

	const result = await controller.handle({
		filename,
	});
	socket.write(`${JSON.stringify(result)}\n`);

	return result;
};

export const requestUploadImageRoute = async (socket: net.Socket, data) => {
	const controller = makeRequestUploadImageController();

	const result = await controller.handle(data);
	socket.write(`${JSON.stringify(result)}`);
	return result;
};

export const downloadImageRoute = async (socket: net.Socket, data: any) => {
	const controller = makeDownloadImageController();
	const [userSession] = data.split("#");
	const result = await controller.handle({ id: userSession });
	socket.write(result.body);
	return result;
};

export const deleteImageRoute = async (socket: net.Socket, data: any) => {
	const controller = makeDeleteImageController();
	const [filename] = data.split("#");
	const result = await controller.handle({ filename });

	socket.write(JSON.stringify(result));
	return result;
};

export const uploadImageRoute = async (
	socket: net.Socket,
	data: any,
	extra,
) => {
	const controller = makeUploadImageController();
	if (data.length === 0) return;
	const result = await controller.handle({ id: extra, data });

	return result;
};
