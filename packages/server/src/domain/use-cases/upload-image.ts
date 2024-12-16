import type { fs } from "node:fs";
export interface UploadImage {
	uploadImage: (data: UploadImage.Params) => Promise<UploadImage.Result>;
}
export namespace UploadImage {
	export type Params = {
		id: string;
		data: string;
	};
	export type Result = fs.WriteStream | null;
}
