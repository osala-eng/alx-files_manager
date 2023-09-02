import { createClient } from 'redis';

/**
 * Redis client Object.
 */
class RedisClient {
  constructor() {
    (async () => {
      this.client = createClient();
      this.client.on('error', (error) => {
        console.log(`Redis client not connected to the server: ${error.message}`);
      });
      await this.client.connect();
    })();
  }

  /**
   * Checks the connection status to Redis.
   * @returns {boolean} true if the connection is alive, false otherwise
   */
  isAlive() {
    return this.client.isOpen;
  }

  /**
   * Get the value at key in Redis.
   * @param {string} key The key to get
   * @returns {Promise<string | null>} The value of key, or null if the key doesn't exist
   */
  async get(key) {
    const value = await this.client.get(key);
    return value;
  }

  /**
   * Set a value to a key in Redis.
   * @param {string} key The key to set.
   * @param {string} value The value to set.
   * @param {number} duration The duration in seconds before the key expires.
   */
  async set(key, value, duration) {
    await this.client.set(key, value);
    await this.client.expire(key, duration);
  }

  /**
   * Delete a key in Redis.
   * @param {string} key The key to delete
   */
  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
