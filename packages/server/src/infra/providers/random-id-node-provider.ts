import * as crypto from "node:crypto";
import { RandomIdProvider } from "../../data/contracts/providers/random-id";

export class RandomIdNodeProvider implements RandomIdProvider{
  async getRandomId(): Promise<string> {
    return  crypto.randomBytes(20).toString('hex');
  }

}