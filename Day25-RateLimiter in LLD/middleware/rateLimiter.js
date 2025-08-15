const redisClient = require("../config/redis");

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip; // Step 1: Identify the user by IP

    // kya ye ip exist krta h\
    // set method redisClient.set(ip,`1:${Date.now()/1000`})
    // await redisClient.expire(3600)


    // exist krta hoga:
    // get


    const count = await redisClient.incr(ip); // Step 2: Increase request count

    // Step 3: If first request, set expiry time of 1 hour (3600 seconds)
    if (count == 1) {
      await redisClient.expire(ip, 3600);
    }

    // Step 4: If more than 60 requests in an hour, block the user
    if (count > 10) throw new Error("User limit exceeded");
    console.log(count);
    next(); // Step 5: Continue to next middleware or route
  } catch (err) {
    res.status(404).send("error " + err);
  }
};

module.exports = rateLimiter;
