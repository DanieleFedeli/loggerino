export interface Events {
	message: (
		channel: string,
		content: string //Object to parse
	) => void;
}

export type MessageContentParsed = { data: string; filename: string };
