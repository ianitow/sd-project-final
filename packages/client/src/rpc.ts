import type { AppRouter } from "@sd-project/server-management/src/main/router/index.js";
import type { AppRouter as ServerRouter } from "@sd-project/server/src/main/router/index.js";

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
const { SERVER_RETRIEVAL_IP = "127.0.0.1", SERVER_RETRIEVAL_PORT = "3000" } = process.env
export const RPCRequest = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://${SERVER_RETRIEVAL_IP}:${SERVER_RETRIEVAL_PORT}/trpc`
    })
  ],
  transformer: superjson
});


export const RPCRequestInternal = (connectionUrl) => createTRPCProxyClient<ServerRouter>({
  links: [
    httpBatchLink({
      url: `http://${connectionUrl}/trpc`,
      maxURLLength: 1024 * 1024 * 10, // a suitable size
    })
  ],
  transformer: superjson
});
