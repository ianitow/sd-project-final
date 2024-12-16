import type { Validation } from "../contracts/validation.js";

export class RequiredField implements Validation {
	constructor(private readonly fieldName: string) { }

	validate(input: any): Error | null {
		if (!input || !input[this.fieldName]) {
			return new Error(`Field ${this.fieldName} is required`);
		}
		return null;
	}
}
