import { makeListAllImagesFromServersController } from "main/factories/controllers/list-all-images-from-servers-controller-factory.js";
import { makeFindServersByImageController } from "main/factories/controllers/make-find-servers-by-image-controller-factory.js";
import { makeRegisterImageController } from "main/factories/controllers/register-image-controller-factory.js";
import { makeUnregisterImageController } from "main/factories/controllers/unregister-image-controller-factory.js";
import { z } from "zod";
import { publicProcedure, router } from "../rpc.js";



export const imagesRouter = router({
  registerImage: publicProcedure.input(z.object({ filename: z.string(), servers: z.array(z.string()) })).mutation(async ({ input }) => {
    const { filename, servers } = input
    const controller = makeRegisterImageController();
    return await controller.handle({ filename, servers });
  }),
  unregisterImage: publicProcedure.input(z.object({ filename: z.string(), servers: z.array(z.string()).optional() })).mutation(async ({ input }) => {
    const { filename, servers } = input
    const controller = makeUnregisterImageController();
    return await controller.handle({ filename, servers });
  }),
  getServersByImage: publicProcedure.input(z.object({ filename: z.string() })).query(async ({ input }) => {
    const { filename } = input
    const controller = makeFindServersByImageController();
    return await controller.handle({ filename });
  }),
  listAllImages: publicProcedure.query(async () => {
    const controller = makeListAllImagesFromServersController();
    return await controller.handle({});
  })
});
