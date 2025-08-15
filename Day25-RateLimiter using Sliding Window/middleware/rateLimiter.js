const redisClient = require("../config/redis");

// total time : 60min
const windowSize = 3600;
const maxRequest = 10;

const rateLimiter = async (req, res, next) => {
  try {
    const key = `IP${req.ip}`; // Step 1: Identify the user by IP
    const currentTime = Date.now() / 1000; //convert milisecond into second
    const windowTime = currentTime - windowSize; // 12:30(jo bhi time) phle kitne time ko htana h

    // 1:20 min - 1 hour = 12.20 = 312452 , 0 se lekr es time period me sb ko hta do

    await redisClient.zRemRangeByScore(key, 0, windowTime); //0 -min , max

    const numOfRequest = await redisClient.zCard(key); //total num req bchi h

    if (numOfRequest >= maxRequest)
      throw new Error("Number of requests exceeded");

    await redisClient.zAdd(key, [
      { score: currentTime, value: `${currentTime}:${Math.random()}` },
    ]); //request added with timestamp

    // key ttl increase krna
    await redisClient.expire(key, windowSize);
    console.log(numOfRequest)
 
    next(); // Step 5: Continue to next middleware or route
  } catch (err) {
    res.status(404).send("error " + err);
  }
};

module.exports = rateLimiter;
