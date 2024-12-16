export interface SendServerStatusGateway {
	sendServerStatus(
		data: SendServerStatusGateway.Params,
	): Promise<SendServerStatusGateway.Result>;
}

export namespace SendServerStatusGateway {
	export type Params = {
		ip: string;
		serverId: string;
		osInformation?: {
			cpusUsage: number;

			memoryUsage: number;

			uptime: number;
		};
	};
	export type Result = boolean;
}
