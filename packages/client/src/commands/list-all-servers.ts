import { RPCRequest } from "../rpc.js";

export async function listAllServersRPC() {
  const result = await RPCRequest.servers.listAllServers.query()
  console.log('\n')
  console.log(result.body.map((item) => `* ${item.serverId} - ${item.serverStatus}`).join('\n'))
  console.log('\n')
  return
}
