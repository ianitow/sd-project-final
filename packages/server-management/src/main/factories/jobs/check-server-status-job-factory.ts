import { makeDbListAllServersStatus } from "../usecases/list-all-servers-status-factory.js";

// Função que chama o caso de uso a cada 5 segundos
export function makeCheckServerStatusJob() {
  const listAllServersStatus = makeDbListAllServersStatus();
  setInterval(async () => {
    listAllServersStatus.listAllServers();
  }, 500);
}
