import { createServer } from './setups/setupServer.js';

async function setup() {

	const server = createServer({
		dev: false,
		port: process.env.PORT ?? 3000,
		prefix: '/trpc',
	});
	await server.start();
}
await setup()
