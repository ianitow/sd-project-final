import type { ServerStatusEntity } from "../entities/server-status.js";

export interface SelectServer {
	selectServer: (number: number) => Promise<SelectServer.Result>;
}
export namespace SelectServer {
	export type Result = ServerStatusEntity[] | null;
}
