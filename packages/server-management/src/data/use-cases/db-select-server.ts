import type { SelectServer } from "../../domain/use-cases/select-server.js";
import type { SelectServerRespository } from "../contracts/repos/server-status.js";

export class DbSelectServer implements SelectServer {
	constructor(
		private readonly selectServerRepository: SelectServerRespository,
	) { }

	async selectServer(number = 1): Promise<SelectServer.Result> {
		return await this.selectServerRepository.selectServer(number);
	}
}
