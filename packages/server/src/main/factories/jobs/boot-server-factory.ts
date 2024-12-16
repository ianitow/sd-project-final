import type { AppRouter } from "@sd-project/server-management/src/main/router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import fs from "node:fs";
import path from "node:path";
import SuperJSON from "superjson";
import { makeListUniqueImagesController } from "../controllers/list-unique-images-controller-factory";
const __dirname = import.meta.dirname

// Função que chama o caso de uso a cada 5 segundos
export async function makeBootServer() {
  if (!process.env.SERVER_RETRIEVAL_IP || !process.env.SERVER_RETRIEVAL_PORT || !process.env.SERVER_ID) {
    throw new Error("Missing env vars: SERVER_RETRIEVAL_IP, SERVER_RETRIEVAL_PORT, SERVER_ID");
  }
  const SERVER_HOST = process.env.SERVER_RETRIEVAL_IP;
  const SERVER_PORT = process.env.SERVER_RETRIEVAL_PORT;
  const fullPath = path.join(__dirname, '..', '..', '..', 'infra', 'repositories', 'storage', process.env.SERVER_ID)
  fs.mkdirSync(fullPath, { recursive: true })
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `http://${SERVER_HOST}:${SERVER_PORT}/trpc`,
      }),
    ],
    transformer: SuperJSON,
  });
  const controller = makeListUniqueImagesController();
  const { statusCode, body } = await controller.handle({})
  if (statusCode !== 200) {
    console.log(body)
    throw new Error("Failed to retrieve images")
  }
  for (const image of body) {
    await client.images.registerImage.mutate({ filename: image, servers: [process.env.SERVER_ID] })
  }

}
