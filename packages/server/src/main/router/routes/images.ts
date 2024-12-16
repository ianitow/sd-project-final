import { z } from "zod";
import { makeDeleteImageController } from "../../factories/controllers/delete-image-controller-factory.js";
import { makeDownloadImageController } from "../../factories/controllers/download-image-controller-factory.js";
import { makeListAllImagesPartByIdController } from "../../factories/controllers/list-all-images-part-by-id-controller-factory.js";
import { makeListUniqueImagesController } from "../../factories/controllers/list-unique-images-controller-factory.js";
import { makeUploadImageController } from "../../factories/controllers/upload-image-controller-factory.js";
import { publicProcedure, router } from "../rpc.js";



export const imagesRouter = router({
  uploadImage: publicProcedure.input(z.object({ id: z.string(), data: z.string() })).mutation(async ({ input }) => {
    const { id, data } = input

    const controller = makeUploadImageController();
    const result = await controller.handle({ id, data })
    return result
  }),
  deleteImage: publicProcedure.input(z.object({ filename: z.string() })).mutation(async ({ input }) => {
    const { filename } = input

    const controller = makeDeleteImageController();
    const result = await controller.handle({ filename })
    return result
  }),
  downloadImage: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const { id } = input
    const controller = makeDownloadImageController();
    const result = await controller.handle({ id })
    return result
  }),
  listAllImagesPartById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {

    const { id } = input
    const controller = makeListAllImagesPartByIdController();
    const result = await controller.handle({ id })
    return result
  }),
  listUniqueImages: publicProcedure.query(async () => {
    const controller = makeListUniqueImagesController();
    const result = await controller.handle({})
    return result
  })
});
