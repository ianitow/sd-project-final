
export interface RegisterImage {
  registerImage: (imageId: string, servers: string[]) => Promise<RegisterImage.Result>;
}
export namespace RegisterImage {
  export type Result = boolean | null;
}
