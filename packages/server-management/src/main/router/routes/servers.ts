

import { makeListAllImagesFromServersController } from "main/factories/controllers/list-all-images-from-servers-controller-factory.js";
import { makeListAllServersStatus } from "main/factories/controllers/list-all-servers-status-controller-factory.js";
import { makeSelectServerController } from "main/factories/controllers/select-server-controller-factory.js";
import { makeUpdateServerController } from "main/factories/controllers/update-server-status-controller-factory.js";
import { z } from "zod";
import { publicProcedure, router } from "../rpc.js";

export const serversRouter = router({
  listAllServers: publicProcedure.query(async () => {
    const controller = makeListAllServersStatus();
    const result = await controller.handle({});
    return result;
  }),
  listAllImages: publicProcedure.query(async () => {
    const controller = makeListAllImagesFromServersController();
    const result = await controller.handle({});
    return result;
  }),
  selectServer: publicProcedure.input(z.number()).query(async ({ input }) => {
    const controller = makeSelectServerController();
    const number = input
    const result = await controller.handle({ number });
    return result;
  }),

  upsertServerInfo: publicProcedure
    .input(
      z.object({
        serverId: z.string(),
        serverIp: z.string(),
        cpuUsage: z.number(),
        memoryUsage: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const { serverId, serverIp, cpuUsage, memoryUsage } = input;
      const controller = makeUpdateServerController();
      const result = await controller.handle({
        serverIp,
        serverId,
        status: "UP",
        cpuUsage,
        memoryUsage,
      });
    }),
});
