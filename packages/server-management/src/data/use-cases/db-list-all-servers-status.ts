import type { ListAllServersStatus } from "../../domain/use-cases/list-all-servers-status.js";
import type { ListServerStatusRepository } from "../contracts/repos/server-status.js";

export class DbListAllServersStatus implements ListAllServersStatus {
	constructor(
		private readonly listServerStatusRepository: ListServerStatusRepository,
	) { }

	async listAllServers(): Promise<ListAllServersStatus.Result> {
		return this.listServerStatusRepository.list();
	}
}
