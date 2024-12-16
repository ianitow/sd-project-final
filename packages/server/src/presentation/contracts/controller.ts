import type { SocketResponse } from "./socket-response";

export interface Controller<T = any> {
	handle(request: T): Promise<SocketResponse>;
}
