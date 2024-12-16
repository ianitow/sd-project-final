import { makeDbSendServerStatus } from "../use-cases/send-server-status-factory";

// Função que chama o caso de uso a cada 5 segundos
export function makeSendServerStatusJob() {
	const sendServerStatusUseCase = makeDbSendServerStatus();
	setInterval(async () => {
		try {
			if (!process.env.SERVER_ID || !process.env.IP || !process.env.PORT) {
				throw new Error("Missing env vars: SERVER_ID, IP, PORT");
			}
			// Certifique-se de passar os parâmetros corretamente
			await sendServerStatusUseCase.sendServerStatus(
				process.env.SERVER_ID,
				`${process.env.IP}:${process.env.PORT}`,
			);
		} catch (error) {
			console.error("[ERROR] Falha ao executar sendServerStatus:", error);
		}
	}, 1000);
}
