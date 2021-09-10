/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileSystemStrategy } from "./file-system.strategy";
import fs from "fs/promises";
const filename = "./filename.txt";
describe("File system strategy", () => {
	const fileStrategy = new FileSystemStrategy("file-system");

	afterEach(async () => {
		await fs.unlink(filename);
	});

	it("Write command", () => {
		expect(() =>
			fileStrategy.write({ fakeObject: "data" }, filename)
		).not.toThrow();
	});
});
