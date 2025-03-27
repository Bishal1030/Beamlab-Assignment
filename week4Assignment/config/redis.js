const { createClient } = require('redis');

const client = createClient({
  url: "redis://redis:6379",  
});

client.on('error', err => console.error('Redis Client Error:', err));

(async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');
    } catch (error) {
        console.error('Redis Connection Failed:', error);
    }
})();

module.exports = { client};