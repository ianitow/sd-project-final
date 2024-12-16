
export interface UnregisterImage {
  unregisterImage: (imageId: string, servers?: string[]) => Promise<UnregisterImage.Result>;
}
export namespace UnregisterImage {
  export type Result = boolean | null;
}
