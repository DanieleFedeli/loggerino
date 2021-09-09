export interface FileStrategy {
	name: string | number | symbol;
	write(data: unknown, filename: string): WriteResultType;
}

export type WriteResultType = Promise<void> | void;
