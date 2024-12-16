import type { UpdateServerStatus } from "../../domain/use-cases/update-server-status.js";
import type { UpdateServerStatusRepository } from "../contracts/repos/server-status.js";

export class DbUpdateServerStatus implements UpdateServerStatus {
	constructor(
		private readonly updateServerStatusRepository: UpdateServerStatusRepository,
	) { }

	async updateServerStatus(
		data: UpdateServerStatus.Params,
	): Promise<UpdateServerStatus.Result> {
		return await this.updateServerStatusRepository.update(data);
	}
}
