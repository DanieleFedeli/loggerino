/* eslint-disable indent */
import fs from "fs";
import { CleanupResultType, FileStrategy } from "../file-strategy.interface";

type Stream = ReturnType<typeof fs.createWriteStream>;
export class FileSystemStrategy implements FileStrategy {
	name: string | number | symbol;
	openStream: Map<string, Stream>;

	constructor(name: string | number | symbol) {
		this.name = name;
		this.openStream = new Map();
	}

	write(data: unknown, filename: string): void {
		const stream = this.getStream(filename);
		const parsedData = this.parseData(data);
		stream.write(parsedData);
		stream.write("\n");
	}

	cleanup(): CleanupResultType {
		const streams = [...this.openStream.values()];
		for (const stream of streams) {
			stream.destroy();
		}
	}

	private getStream(filename: string): Stream {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		if (this.openStream.has(filename)) return this.openStream.get(filename)!;

		const _createdStream = fs.createWriteStream(filename, { flags: "a+" });
		this.openStream.set(filename, _createdStream);

		return _createdStream;
	}

	private parseData(data: unknown): string {
		switch (typeof data) {
			case "object":
				return JSON.stringify(data);
			case "string":
				return data;
			case "undefined":
			case "function":
				throw new Error("No serializable data incoming");
			default:
				return <string>data;
		}
	}
}
