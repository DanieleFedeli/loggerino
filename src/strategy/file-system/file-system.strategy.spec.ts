/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileSystemStrategy } from "./file-system.strategy";
import fs from "fs/promises";
const filename = "./filename.txt";
const fakeString = "fakeString";
const fakeObject = { fakeKey: fakeString };

describe("File system strategy", () => {
	const fileStrategy = new FileSystemStrategy("file-system");

	afterAll(() => fs.unlink(filename).catch(console.warn));

	it("Write command", () => {
		expect(() => fileStrategy.write(fakeObject, filename)).not.toThrow();
	});

	it("Cleanup command", () => {
		fileStrategy.write(fakeObject, filename);
		fileStrategy.write(fakeString, filename);
		expect(() => fileStrategy.cleanup()).not.toThrow();
	});
});
