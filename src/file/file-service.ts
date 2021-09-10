import {
	FileStrategy,
	WriteResultType,
} from "../strategy/file-strategy.interface";

export class FileService {
	private strategies;

	constructor() {
		this.strategies = new Map<symbol | string | number, FileStrategy>();
	}

	add(strategy: FileStrategy): void {
		this.strategies.set(strategy.name, strategy);
	}

	async write(
		data: unknown,
		filename: string
	): Promise<PromiseSettledResult<WriteResultType>[]> {
		const resultPromises = this.getStrategies().map(fileStrategy =>
			fileStrategy.write(data, filename)
		);

		return await Promise.allSettled(resultPromises);
	}

	delete(name: string | symbol | number): FileStrategy | undefined {
		const strategy = this.strategies.get(name);
		this.strategies.delete(name);
		return strategy;
	}

	getStrategies(): FileStrategy[] {
		return [...this.strategies.values()];
	}

	cleanup(): void {
		const strategies = this.getStrategies();

		for (const strategy of strategies) {
			strategy.cleanup();
		}
	}
}
