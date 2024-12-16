import type { ServerStatusEnum } from "../entities/server-status-enum.js";
import type { ServerStatusEntity } from "../entities/server-status.js";

export interface CreateServerStatus {
	createServerStatus: (
		data: CreateServerStatus.Params,
	) => Promise<CreateServerStatus.Result>;
}
export namespace CreateServerStatus {
	export type Params = {
		serverIp: string;
		serverId: string;
		status: ServerStatusEnum;
	};
	export type Result = ServerStatusEntity | null;
}
