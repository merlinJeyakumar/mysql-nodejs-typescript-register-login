import * as redis from 'redis';
import config from "../config/Configuration";

const redisClient = redis.createClient({
    password: config.redis.pass
});

redisClient.connect().catch(reason => {
    console.log(`RedisError: ${reason}`)
})

export const getRefreshToken = async (userId: string) => {
    return await redisClient.HGET(userId, "refresh").catch(reason => {
        console.log(`RedisError: ${reason}`)
        return undefined;
    });
}
export const getAccessToken = (userId: string) => {
    return redisClient.HGET(userId, "access").catch(reason => {
        console.log(`RedisError: ${reason}`)
        return undefined;
    });
}
export const putAccessToken = (userId: string, value: string) => {
    return redisClient.HSET(userId, "access", value).catch(reason => {
        console.log(`RedisError: ${reason}`)
        return undefined;
    });
}
export const putRefreshToken = (userId: string, value: string) => {
    return redisClient.HSET(userId, "refresh", value).catch(reason => {
        console.log(`RedisError: ${reason}`)
        return undefined;
    });
}