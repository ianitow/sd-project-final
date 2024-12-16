import type { Validation } from "../contracts/validation.js";

export class ValidServerStatus implements Validation {
	private readonly validStatus = ["UP", "DOWN"];
	constructor(private readonly fieldName: string) { }

	validate(input: any): Error | null {
		const status = input[this.fieldName];

		if (!status || typeof status !== "string") {
			return new Error("Status is required and must be a string");
		}

		return this.validStatus.includes(status.toUpperCase())
			? null
			: new Error("Invalid status");
	}
}
