import type { SendServerStatus } from "../../domain/use-cases/send-server-status";
import type { SendServerStatusGateway } from "../contracts/gateways/send-server-status-gateway";
import type { SystemInformationProvider } from "../contracts/providers/system-information";

export class DbSendServerStatus implements SendServerStatus {
	constructor(
		private readonly sendServerStatusGateway: SendServerStatusGateway,
		private readonly systemInformationProvider: SystemInformationProvider,
	) {}
	async sendServerStatus(serverId: string, ip: string): Promise<boolean> {
		const osInformation = await this.systemInformationProvider.getCpusUsage();
		const memoryUsage = await this.systemInformationProvider.getMemoryUsage();
		const uptime = await this.systemInformationProvider.getUptime();
		return await this.sendServerStatusGateway.sendServerStatus({
			ip,
			serverId,
			osInformation: {
				cpusUsage: osInformation.usagePercentage,
				memoryUsage: memoryUsage.usagePercentage,
				uptime,
			},
		});
	}
}
