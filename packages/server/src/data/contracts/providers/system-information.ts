type SystemInformation = {
	usagePercentage: number;
	total: number;
	free: number;
	used: number;
};
export interface SystemInformationProvider {
	getCpusUsage(): Promise<Pick<SystemInformation, "usagePercentage">>;
	getMemoryUsage(): Promise<SystemInformation>;
	getUptime(): Promise<number>;
}
