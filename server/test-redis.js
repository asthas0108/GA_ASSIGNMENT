// test-redis.js
import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config(); // load .env file

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => console.log("✅ Redis Cloud connected"));

async function testRedis() {
  await redis.set("hello", "world", "EX", 60); // expires in 60 seconds
  const value = await redis.get("hello");
  console.log("Value from Redis:", value); // Should print: world
  process.exit(); // close the script
}

testRedis().catch((err) => {
  console.error("❌ Redis test error:", err);
});
