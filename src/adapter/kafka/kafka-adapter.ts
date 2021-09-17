import { EventEmitter } from "events";
import { Consumer } from "kafkajs";
import { MessageBrokerAdapter } from "../adapter.interface";
import { Events } from "../events.interface";

export class KafkaAdapter extends EventEmitter implements MessageBrokerAdapter {
	private kafka;
	constructor(kafka: Consumer) {
		super();
		this.kafka = kafka;
	}

	async subscribe(channelId: string): Promise<this> {
		await this.kafka.subscribe({ topic: channelId, fromBeginning: true });
		return this;
	}

	unsubscribe(channelId: string): this {
		this.kafka.pause([{ topic: channelId }]);
		return this;
	}

	on<E extends "message">(event: E, listener: Events[E]): this {
		this.kafka.run({
			eachBatchAutoResolve: true,
			eachMessage: async ({ topic, message }) =>
				listener(topic, message.value?.toString() ?? ""),
		});
		return this;
	}
}
