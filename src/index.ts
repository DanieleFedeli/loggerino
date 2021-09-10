import Redis from "ioredis";
import { IORedisAdapter } from "./adapter/ioredis-adapter";
import { FileService } from "./file/file-service";
import { MessageBroker } from "./message-broker";
import { FileSystemStrategy } from "./strategy/file-system/file-system.strategy";

console.info("Creating dependencies...");
const redisClient = new Redis();
const fileSystemStrategy = new FileSystemStrategy("file-system");
const fileService = new FileService();
fileService.add(fileSystemStrategy);
const ioRedis = new IORedisAdapter(redisClient);

console.info("Injecting dependencies...");
const broker = new MessageBroker(ioRedis, fileService);

console.info("Starting services...");
broker.start();
console.info("[READY] Listening events");
