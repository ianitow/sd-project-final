import RabbitMQ from "main/setups/setupRabbitMq.js";
import type {
	CreateServerStatusRepository,
	ServerStatusRepository,
	UpdateServerStatusRepository,
} from "../../../data/contracts/repos/server-status.js";
import { ServerStatusEnum } from "../../../domain/entities/server-status-enum.js";
import { ServerStatusEntity } from "../../../domain/entities/server-status.js";

export const servers: ServerStatusEntity[] = [];
export let ROUND_ROBIN = 0;
export class ServerStatusMemoryRepository implements ServerStatusRepository {
	async create(
		data: CreateServerStatusRepository.Params,
	): Promise<ServerStatusEntity | null> {
		const server = servers.find(
			(server) =>
				server.serverId === data.serverId ||
				server.getConnectionUrl() === data.serverIp,
		);
		if (server) {
			throw new Error(
				`Server with ${server.serverId} and ${server.getConnectionUrl()} already exists!`,
			);
		}
		const serverStatus = new ServerStatusEntity(
			data.serverId,
			data.status,
			data.serverIp,
		);
		servers.push(serverStatus);

		return serverStatus;
	}
	async update(
		data: UpdateServerStatusRepository.Params,
	): Promise<UpdateServerStatusRepository.Result> {
		const server = servers.find((server) => server.serverId === data.serverId);

		if (server && server?.serverId !== data.serverId) {
			return null;
		}
		if (!server) {
			const up = new ServerStatusEntity(
				data.serverId,
				data.status,
				data.serverIp,
			);
			servers.push(up);
			return up;
		}

		server.update(data.status);
		return server;
	}
	async list(): Promise<ServerStatusEntity[]> {
		const EXCHANGE_NAME = "server_events"
		const downServers = []
		for (const item of servers) {
			if (item.getUpdatedAt() < new Date(Date.now() - 3000)) {
				item.update(ServerStatusEnum.DOWN);
				downServers.push(item)
			}
		}
		if (downServers.length === 0) return servers

		const rabbitMQ = RabbitMQ.getInstance();
		await rabbitMQ.connect();
		const channel = rabbitMQ.getChannel();
		await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });

		for (const server of downServers) {

			const message = { event: 'SERVER_DOWN', timestamp: Date.now() };
			const routingKey = server.serverId;

			channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(message)));
			console.log("[RabbitMQ] Event sent SERVER_DOWN with routing key:", routingKey);
		}



		return servers;
	}
	async selectServer(number: number): Promise<ServerStatusEntity[]> {
		const total = []

		const serversUp = servers.filter(
			(server) => server.getStatus() === ServerStatusEnum.UP,
		);
		if (serversUp.length === 0) {
			return []
		}
		for (let i = 0; i < number; i++) {
			const round = ROUND_ROBIN % serversUp.length;
			ROUND_ROBIN++;
			total.push(servers[round])
		}
		return total;

	}
}
