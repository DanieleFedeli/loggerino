import { FileService } from "./file-service";
import { FileSystemStrategy } from "./file-system.strategy";

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

	test("Write on command", async () => {
		const strategy = new FileSystemStrategy("file-system");
		jest.spyOn(strategy, "write").mockImplementation(() => Promise.resolve());

		fileService.add(strategy);
		const allSettledResult = await fileService.write({}, "./file-name.txt");
		expect(allSettledResult).toMatchObject([
			{ status: "fulfilled", value: undefined },
		]);
	});
});
