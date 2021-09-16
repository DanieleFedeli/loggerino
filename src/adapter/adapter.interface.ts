import { TypedEventEmitter } from "./typed-emitter.interface";
import { Events } from "./events.interface";

export interface MessageBrokerAdapter extends TypedEventEmitter<Events> {
	subscribe(
		channelId: string,
		callback?: SubscribeCallback
	): MessageBrokerAdapter | Promise<MessageBrokerAdapter>;

	unsubscribe(
		channelId: string,
		callback?: SubscribeCallback
	): MessageBrokerAdapter | Promise<MessageBrokerAdapter>;
}

type SubscribeCallback = (error: Error | null, count: number) => void;
