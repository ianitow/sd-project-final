import { DbRequestUploadImage } from "../../../data/use-cases/db-request-upload-image"
import { RandomIdNodeProvider } from "../../../infra/providers/random-id-node-provider"
import { ImagesOSRepository } from "../../../infra/repositories/images-os-repository"

export const makeDbRequestUploadImage = (): DbRequestUploadImage => {
  const idProvider = new RandomIdNodeProvider()
  const repository = new ImagesOSRepository()
  return new DbRequestUploadImage(idProvider,repository)
}