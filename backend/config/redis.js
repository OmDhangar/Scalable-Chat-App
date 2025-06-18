import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD
};

// Create Redis pub/sub clients
export const publisher = new Redis(redisConfig);
export const subscriber = new Redis(redisConfig);

// Error handling
publisher.on('error', (err) => console.error('Redis Publisher Error:', err));
subscriber.on('error', (err) => console.error('Redis Subscriber Error:', err));

// Connection success
publisher.on('connect', () => console.log('Redis Publisher Connected'));
subscriber.on('connect', () => console.log('Redis Subscriber Connected'));