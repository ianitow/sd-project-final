import type { SocketResponse } from "./socket-response.js";

export interface Controller<T = any> {
	handle(request: T): Promise<SocketResponse>;
}
