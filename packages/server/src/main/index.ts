import { makeBootServer } from "./factories/jobs/boot-server-factory.js";
import { makeSendServerStatusJob } from "./factories/jobs/send-server-status-job-factory.js";

import { createServer } from './setups/setupServer.js';



async function setup() {
	makeSendServerStatusJob();
	const server = createServer({
		dev: false,
		port: process.env.PORT ?? 8000,
		prefix: '/trpc',
	});

	void server.start();
	await makeBootServer()

}
await setup();

