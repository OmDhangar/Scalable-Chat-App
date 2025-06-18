import { createAdapter } from "@socket.io/redis-adapter";
import { publisher, subscriber } from "../config/redis.js";

export const createRedisAdapter = () => {
    try {
        const adapter = createAdapter(publisher, subscriber);
        console.log("Redis adapter created successfully");
        return adapter;
    } catch (error) {
        console.error("Error creating Redis adapter:", error);
        throw error;
    }
};