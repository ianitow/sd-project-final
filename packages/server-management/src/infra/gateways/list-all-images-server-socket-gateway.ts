import net from "node:net";
import type { ListAllImagesServerGateway } from "../../data/contracts/gateways/list-all-images-server-gateway.js";

export class ListAllImagesSocketGateway implements ListAllImagesServerGateway {
	async listAllImages(serverId: string, serverUrl: string): Promise<string[]> {
		return new Promise((resolve, reject) => {
			const client = new net.Socket();
			const [ip, port] = serverUrl.split(":");

			client.connect(Number(port), ip, () => {
				const message = "LIST_ALL_IMAGES|\n";
				client.write(message);
			});

			client.on("data", (data) => {
				const response = data
					.toString()
					.split("\n")
					.filter((item) => item.trim() !== "");

				client.end();

				resolve({
					statusCode: 200,
					body: {
						serverId,
						ip,
						port,
						data: JSON.parse(response).body,
					},
				});
			});

			// Lidar com o fechamento da conexão inesperada
			client.on("close", () => {
				console.log("Conexão encerrada pelo servidor2");
			});

			// Lidar com erros na conexão
			client.on("error", (error) => {
				console.error(`Erro na conexão: ${error.message}`);
				client.end();
				reject(error);
			});
		});
	}
}
