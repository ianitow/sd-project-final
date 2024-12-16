export interface SendServerStatus {
	sendServerStatus: (id: string, ip: string) => Promise<boolean>;
}
