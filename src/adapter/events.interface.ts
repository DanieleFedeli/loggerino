export interface Events {
	log: (content: { data: string; filename: string }) => void;
}
