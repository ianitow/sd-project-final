import { DbUpdateServerStatus } from "../../../data/use-cases/db-update-server-status.js";
import { ServerStatusMemoryRepository } from "../../../infra/db/memory/server-status-memory-repository.js";

export const makeDbUpdateServerStatus = (): DbUpdateServerStatus => {
	const memoryDb = new ServerStatusMemoryRepository();
	return new DbUpdateServerStatus(memoryDb);
};
