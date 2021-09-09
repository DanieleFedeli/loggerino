import fs from "fs/promises";
import { FileStrategy } from "./file-strategy.interface";

export class FileSystemStrategy implements FileStrategy {
	name: string | number | symbol;

	constructor(name: string | number | symbol) {
		this.name = name;
	}

	async write(data: unknown, filename: string): Promise<void> {
		try {
			const stringifiedData = JSON.stringify(data);
			await fs.writeFile(filename, stringifiedData);
		} catch (error) {
			console.error(error);
		}
	}
}
