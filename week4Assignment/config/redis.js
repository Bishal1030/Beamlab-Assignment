const Redis = require('ioredis')


const redis = new Redis();


redis.on("connect", () => console.log("redis connected"))
redis.on("error", (error) => console.error("couldn't connected to redis", error))


module.exports = redis;