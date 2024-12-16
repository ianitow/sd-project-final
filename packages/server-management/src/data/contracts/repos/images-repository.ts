
/**
 * CREATE
 */


export interface ListAllImagesRepository {
  listAllImages: () => Promise<string[]>
}
interface GetServersByImageRepository {
  getServersByImage: (imageId: string) => Promise<string[]>
}
export interface ImagesRepository extends ListAllImagesRepository, GetServersByImageRepository {
  registerImage: (
    imageId: string,
    servers: string[],
  ) => Promise<boolean>;

  unregisterImage: (fileName: string, servers?: string[]) => Promise<boolean>;
}


