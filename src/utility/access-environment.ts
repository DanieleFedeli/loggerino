import { config } from "dotenv";
config();

const cache = new Map<string, unknown>();
export function accessEnvironment<T = string>(key: string, fallback?: T): T {
	if (cache.has(key)) return <T>cache.get(key);

	const environmentValue = process.env[key];
	cache.set(key, environmentValue);

	if (environmentValue) return <T>(<unknown>environmentValue);
	if (fallback) return fallback;

	throw new Error(`${key} not present in process.env`);
}
