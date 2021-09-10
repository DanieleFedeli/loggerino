import { EventEmitter } from "events";
import { Redis } from "ioredis";
import { MessageBrokerAdapter } from "./adapter.interface";
import { Events } from "./events.interface";

export class IORedisAdapter
	extends EventEmitter
	implements MessageBrokerAdapter
{
	private redis;
	constructor(redis: Redis) {
		super();
		this.redis = redis;
	}

	subscribe(
		channelId: string,
		callback: (error: Error | null, count: number) => void
	): this {
		this.redis.subscribe(channelId, callback);
		return this;
	}

	unsubscribe(
		channelId: string,
		callback: (error: Error | null, count: number) => void
	): this {
		this.redis.unsubscribe(channelId, callback);
		return this;
	}

	on<E extends "log">(event: E, listener: Events[E]): this {
		this.redis.on(event, listener);
		return this;
	}
}
