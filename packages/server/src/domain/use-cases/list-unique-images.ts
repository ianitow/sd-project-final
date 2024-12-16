export interface ListUniqueImages {
  listUniqueImages: () => Promise<ListUniqueImages.Result>;
}
export namespace ListUniqueImages {
  export type Result = string[]
}
