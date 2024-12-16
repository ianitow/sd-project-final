import { DbSendServerStatus } from "../../../data/use-cases/db-send-server-status";
import { SendServerStatusSocketGateway } from "../../../infra/gateways/send-server-status-socket-gateway";
import { SystemInformationOSProvider } from "../../../infra/providers/system-information-os-provider";

export const makeDbSendServerStatus = (): DbSendServerStatus => {
	const gateway = new SendServerStatusSocketGateway();
	const systemInformation = new SystemInformationOSProvider();
	return new DbSendServerStatus(gateway, systemInformation);
};
