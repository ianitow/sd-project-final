import type { ImagesRepository } from "data/contracts/repos/images-repository.js";
import type { ServerStatusRepository } from "data/contracts/repos/server-status.js";
import type { FindServersByImage } from "domain/use-cases/find-servers-by-image.js";

export class DbFindServersByImage implements FindServersByImage {
  constructor(
    private readonly listAllServers: ServerStatusRepository,
    private readonly images: ImagesRepository,
  ) { }

  async findServersByImage(
    filename: string,
  ): Promise<FindServersByImage.Result> {
    const servers = await this.listAllServers.list();
    console.log(servers)
    if (!servers || servers.length === 0) return []
    const i = await this.images.getServersByImage(filename);
    const result = servers.filter((server) =>
      i.includes(server.serverId),
    );
    return result.length > 0 ? result : [];
  }
}
