export interface TypedEventEmitter<Events> {
	on<E extends keyof Events>(event: E, listener: Events[E]): this;
	// once<E extends keyof Events>(event: E, listener: Events[E]): this;
	// eventNames(): (keyof Events | string | symbol)[];
}
