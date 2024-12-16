import type { ServerStatusEntity } from "../entities/server-status.js";

export interface ListAllServersStatus {
	listAllServers: () => Promise<ListAllServersStatus.Result>;
}
export namespace ListAllServersStatus {
	export type Result = ServerStatusEntity[];
}
