import { FileService } from "./file-service";
import { FileSystemStrategy } from "../strategy/file-system/file-system.strategy";

describe("File service", () => {
	let fileService: FileService;

	beforeEach(() => {
		fileService = new FileService();
		jest.clearAllMocks();
	});

	test("Adding strategy", () => {
		const strategy = new FileSystemStrategy("file-system");
		fileService.add(strategy);

		const newStrategies = fileService.getStrategies();
		expect(newStrategies).toContain(strategy);
	});

	test("Write command", async () => {
		const strategy = new FileSystemStrategy("file-system");
		jest.spyOn(strategy, "write").mockImplementation(() => Promise.resolve());

		fileService.add(strategy);
		const allSettledResult = await fileService.write({}, "./file-name.txt");
		expect(allSettledResult).toMatchObject([
			{ status: "fulfilled", value: undefined },
		]);
	});

	test("Delete command", () => {
		expect(fileService.getStrategies()).toHaveLength(0);

		const strategy = new FileSystemStrategy("file-system");
		fileService.add(strategy);

		expect(fileService.getStrategies()).toHaveLength(1);

		fileService.delete("file-system");
		expect(fileService.getStrategies()).toHaveLength(0);
	});

	test("cleanup command", () => {
		const strategy = new FileSystemStrategy("file-system");

		fileService.add(strategy);
		expect(() => fileService.cleanup()).not.toThrow();
	});
});
