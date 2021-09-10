import { MessageContentParsed } from "adapter/events.interface";
import { FileService } from "file/file-service";
import { MessageBrokerAdapter } from "./adapter/adapter.interface";

export class MessageBroker {
	private broker;
	private channelMap;
	private fileService;

	constructor(broker: MessageBrokerAdapter, fileService: FileService) {
		this.broker = broker;
		this.channelMap = new Set<string>();
		this.fileService = fileService;
	}

	start(): void {
		this.broker.on("message", (channel, message) => {
			const { data, filename } = JSON.parse(message) as MessageContentParsed;
			this.fileService.write(data, filename);
		});
	}

	cleanup(): void {
		for (const channel in this.channelMap) {
			this.broker.unsubscribe(channel, error => {
				if (error)
					console.error(`Error in disconnecting to ${channel}`, error.message);
			});
			this.channelMap.delete(channel);
		}
		this.fileService.cleanup();
	}

	subscribe(channelId: string): void {
		this.broker.subscribe(channelId, (error, count) => {
			if (error) console.error(error.message);
			else {
				console.log(
					"Subscribed to channel:",
					channelId,
					"\tnumber of members:",
					count
				);
				this.channelMap.add(channelId);
			}
		});
	}
}
