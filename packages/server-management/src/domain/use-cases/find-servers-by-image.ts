import type { ServerStatusEntity } from "../entities/server-status.js";

export interface FindServersByImage {
  findServersByImage: (filename: string) => Promise<FindServersByImage.Result>;
}
export namespace FindServersByImage {
  export type Result = ServerStatusEntity[] | null;
}
