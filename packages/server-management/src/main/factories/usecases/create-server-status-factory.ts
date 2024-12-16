import { DbCreateServerStatus } from "../../../data/use-cases/db-create-server-status.js";
import { ServerStatusMemoryRepository } from "../../../infra/db/memory/server-status-memory-repository.js";

export const makeDbCreateServerStatus = (): DbCreateServerStatus => {
	const memoryDb = new ServerStatusMemoryRepository();
	return new DbCreateServerStatus(memoryDb);
};
