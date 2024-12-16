import type { CreateServerStatus } from "../../domain/use-cases/create-server-status.js";
import type { CreateServerStatusRepository } from "../contracts/repos/server-status.js";

export class DbCreateServerStatus implements CreateServerStatus {
	constructor(
		private readonly createServerStatusRepo: CreateServerStatusRepository,
	) { }

	async createServerStatus(
		data: CreateServerStatus.Params,
	): Promise<CreateServerStatus.Result> {
		return await this.createServerStatusRepo.create(data);
	}
}
