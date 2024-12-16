import { DbSelectServer } from "../../../data/use-cases/db-select-server.js";
import { ServerStatusMemoryRepository } from "../../../infra/db/memory/server-status-memory-repository.js";

export const makeDbSelectServer = (): DbSelectServer => {
	const memoryDb = new ServerStatusMemoryRepository();
	return new DbSelectServer(memoryDb);
};
