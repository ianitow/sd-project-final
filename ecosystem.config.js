const globalEnv = {
	SERVER_RETRIEVAL_IP: "127.0.0.1",
	SERVER_RETRIEVAL_PORT: 3000,
	REPLICATE_SERVER: 10,
	INITIAL_PORT: 9000,
};
module.exports = {
	apps: [
		...Array(globalEnv.REPLICATE_SERVER)
			.fill(0)
			.map((_, index) => ({
				name: `app-${globalEnv.INITIAL_PORT + index}`,
				script: "./packages/server/src/main/index.ts",
				interpreter: "tsx",

				pmx: false,
				node_args: [`--inspect=${globalEnv.INITIAL_PORT + index + 100}`],
				env: {
					PORT: `${globalEnv.INITIAL_PORT + index}`,
					IP: "127.0.0.1",
					SERVER_ID: `Iaan-Server-@${globalEnv.INITIAL_PORT + index}`,
					...globalEnv,
				},
			})),
	],
};
