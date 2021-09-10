export interface FileStrategy {
	name: string | number | symbol;
	write(data: unknown, filename: string): WriteResultType;
	cleanup(): CleanupResultType;
}

export type WriteResultType = Promise<void> | void;
export type CleanupResultType = Promise<void> | void;
