import type { ServerStatusEnum } from "../entities/server-status-enum.js";
import type { ServerStatusEntity } from "../entities/server-status.js";

export interface UpdateServerStatus {
	updateServerStatus: (
		data: UpdateServerStatus.Params,
	) => Promise<UpdateServerStatus.Result>;
}
export namespace UpdateServerStatus {
	export type Params = {
		serverIp: string;
		serverId: string;
		status: ServerStatusEnum;
	};
	export type Result = ServerStatusEntity | null;
}
