export interface RandomIdProvider {
  getRandomId(): Promise<string>
}