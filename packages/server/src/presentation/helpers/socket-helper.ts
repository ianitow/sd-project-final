import type { SocketResponse } from "../contracts/socket-response";

export const ok = (data: any): SocketResponse => ({
	statusCode: 200,
	body: data,
});

export const error = (data: any, onlyMessage = false): SocketResponse => ({
	statusCode: 500,
	body: onlyMessage ? data.message : data,
});
