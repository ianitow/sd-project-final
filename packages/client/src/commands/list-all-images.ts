import { RPCRequest } from "../rpc.js";
import { preffix } from "../utils.js";

export const listAllImagesRPC = async () => {
  const images = await RPCRequest.servers.listAllImages.query();
  return images.body.length > 0 ? images.body : `${preffix}Sem imagem anexada`
}
