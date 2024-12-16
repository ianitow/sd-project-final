import type { ServerStatusEnum } from "./server-status-enum.js";
export class ServerStatusEntity {
	constructor(
		readonly serverId: string,
		private serverStatus: ServerStatusEnum,
		private readonly connectionUrl: string,
		private updatedAt: Date = new Date(),
	) {
		this.serverId = serverId;
		this.serverStatus = serverStatus;
		this.connectionUrl = connectionUrl;
	}
	update(status: ServerStatusEnum): void {
		this.serverStatus = status;
		this.updatedAt = new Date();
	}

	getStatus(): ServerStatusEnum {
		return this.serverStatus;
	}

	getConnectionUrl(): string {
		return this.connectionUrl;
	}

	getUpdatedAt(): Date {
		return this.updatedAt;
	}
}
