import type { ImagesRepository } from "data/contracts/repos/images-repository.js";

export class ImagesMemoryRepository implements ImagesRepository {
  static readonly ALL_IMAGES: Map<string, string[]> = new Map();

  getServersByImage(imageId: string): Promise<string[]> {
    return Promise.resolve(ImagesMemoryRepository.ALL_IMAGES.get(imageId) || [])
  };

  async listAllImages(): Promise<string[]> {
    const result = [...ImagesMemoryRepository.ALL_IMAGES.keys()]
    return result
  };

  async registerImage(imageId: string, servers: string[]) {
    const image = ImagesMemoryRepository.ALL_IMAGES.get(imageId)
    if (!image) {
      ImagesMemoryRepository.ALL_IMAGES.set(imageId, servers)
      return true
    }

    const allServers = new Set([...servers, ...image.values()])

    ImagesMemoryRepository.ALL_IMAGES.set(imageId, [...allServers.values()])
    return true
  }
  async unregisterImage(filename: string, servers?: string[]) {
    if (!servers) {
      ImagesMemoryRepository.ALL_IMAGES.delete(filename)
      return true
    }


    const withoutServer = ImagesMemoryRepository.ALL_IMAGES.get(filename)
    if (!ImagesMemoryRepository.ALL_IMAGES.get(filename) || !withoutServer) {
      return true
    }

    const result = withoutServer.filter((server) => !servers.includes(server))
    if (!result || result.length === 0) {
      ImagesMemoryRepository.ALL_IMAGES.delete(filename)
      return true
    }

    ImagesMemoryRepository.ALL_IMAGES.set(filename, result)

    return true
  }

}
