export interface ListAllImagesServerGateway {
	listAllImages(serverId: string, serverUrl: string): Promise<string[]>;
}
