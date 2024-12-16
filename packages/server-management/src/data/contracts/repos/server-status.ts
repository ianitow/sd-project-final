import type { ServerStatusEnum } from "../../../domain/entities/server-status-enum.js";
import type { ServerStatusEntity } from "../../../domain/entities/server-status.js";

/**
 * CREATE
 */
export interface CreateServerStatusRepository {
	create: (
		data: CreateServerStatusRepository.Params,
	) => Promise<ServerStatusEntity | null>;
}
export namespace CreateServerStatusRepository {
	export type Params = {
		serverId: string;
		serverIp: string;
		status: ServerStatusEnum;
	};
}

/**
 * Select
 */
export interface SelectServerRespository {
	selectServer: (number: number) => Promise<ServerStatusEntity[]>;
}

export interface ListServerStatusRepository {
	list: () => Promise<ServerStatusEntity[]>;
}

export interface UpdateServerStatusRepository {
	update: (
		data: UpdateServerStatusRepository.Params,
	) => Promise<UpdateServerStatusRepository.Result>;
}
export namespace UpdateServerStatusRepository {
	export type Params = {
		serverId: string;
		serverIp: string;
		status: ServerStatusEnum;
	};

	export type Result = ServerStatusEntity | null;
}

export interface ServerStatusRepository
	extends UpdateServerStatusRepository,
	ListServerStatusRepository,
	SelectServerRespository,
	CreateServerStatusRepository { }
