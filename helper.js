const redis = require("redis");
let redisClient;

(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();

redisClient.set("species", JSON.stringify("results"));
redisClient.get("species").then((res) => console.log(res));

module.exports = redisClient;
