import { DbListAllServersStatus } from "../../../data/use-cases/db-list-all-servers-status.js";
import { ServerStatusMemoryRepository } from "../../../infra/db/memory/server-status-memory-repository.js";

export const makeDbListAllServersStatus = (): DbListAllServersStatus => {
	const repository = new ServerStatusMemoryRepository();
	return new DbListAllServersStatus(repository);
};
