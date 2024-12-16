import os from "os";
import type { SystemInformationProvider } from "../../data/contracts/providers/system-information";
export class SystemInformationOSProvider implements SystemInformationProvider {
	async getCpusUsage(): Promise<
		Pick<
			{ usagePercentage: number; total: number; free: number; used: number },
			"usagePercentage"
		>
	> {
		const cpus = os.cpus();
		let idle = 0;
		let total = 0;
		for (const cpu of cpus) {
			for (const type in cpu.times) {
				total += cpu.times[type];
			}
			idle += cpu.times.idle;
		}

		const usage = 1 - idle / total;
		return {
			usagePercentage: Number((usage * 100).toFixed(2)),
		};
	}
	async getMemoryUsage(): Promise<{
		usagePercentage: number;
		total: number;
		free: number;
		used: number;
	}> {
		const totalMemory = os.totalmem();
		const freeMemory = os.freemem();
		const usedMemory = totalMemory - freeMemory;

		return {
			total: Number((totalMemory / 1024 ** 3).toFixed(2)), // Total de memória
			free: Number((freeMemory / 1024 ** 3).toFixed(2)), // Memória livre
			used: Number((usedMemory / 1024 ** 3).toFixed(2)), // Memória usada
			usagePercentage: Number(((usedMemory / totalMemory) * 100).toFixed(2)), // Porcentagem de uso
		};
	}
	getUptime(): Promise<number> {
		const uptimeInSeconds = os.uptime();
		const hours = Math.floor(uptimeInSeconds / 3600);
		const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
		const seconds = uptimeInSeconds % 60;
		return Promise.resolve(hours * 3600 + minutes * 60 + seconds);
	}
}
