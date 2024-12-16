import type { AppRouter } from "@sd-project/server-management/src/main/router/index.js";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { SendServerStatusGateway } from "../../data/contracts/gateways/send-server-status-gateway";


export class SendServerStatusSocketGateway implements SendServerStatusGateway {




	async sendServerStatus(
		data: SendServerStatusGateway.Params,
	): Promise<SendServerStatusGateway.Result> {
		const SERVER_HOST = process.env.SERVER_RETRIEVAL_IP;
		const SERVER_PORT = process.env.SERVER_RETRIEVAL_PORT;

		const client = createTRPCProxyClient<AppRouter>({
			links: [
				httpBatchLink({
					url: `http://${SERVER_HOST}:${SERVER_PORT}/trpc`
				})
			],
			transformer: superjson
		});

		const { ip, serverId, osInformation } = data;
		const cpuUsage = osInformation?.cpusUsage;
		const memoryUsage = osInformation?.memoryUsage;

		try {
			await client.servers.upsertServerInfo.mutate({
				serverId,
				serverIp: ip,
				cpuUsage: cpuUsage ?? 0,
				memoryUsage: memoryUsage ?? 0
			})
		} catch (err) {
			console.log('Erro ao se comunicar com server-management!')
			return false
		}

		return true;
	}
}
