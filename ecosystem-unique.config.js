 const globalEnv = {
	SERVER_RETRIEVAL_IP: "127.0.0.1",
	SERVER_RETRIEVAL_PORT: 3000,
	REPLICATE_SERVER: 1,

  SERVER_ID: "Iaan-Server-@Iaan0101",
  IP: "127.0.0.1",
  PORT: 9000
};
module.exports = {
	apps: [
		...Array(globalEnv.REPLICATE_SERVER)
			.fill(0)
			.map((_, index) => ({
				name: `app-${globalEnv.SERVER_ID}`,
				script: "./packages/server/src/main/index.ts",
				interpreter: "tsx",

				pmx: false,
				env: {
				
					...globalEnv,
				},
			})),
	],
};
