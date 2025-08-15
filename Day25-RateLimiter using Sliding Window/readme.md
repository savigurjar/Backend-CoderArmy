## 📌 Rate Limiter (Sliding Window)

### **What it does**

This middleware **limits the number of requests** an IP address can make within a given time window.
If a user sends **too many requests**, it blocks them until the time window resets.

---

### **Configuration**

```js
// total allowed time for tracking requests (seconds)
const windowSize = 3600; // 1 hour

// max requests allowed within the time window
const maxRequest = 10;
```

---

### **How it works**

1. **Identify the User**

   - Uses `req.ip` to get the client’s IP.
   - Stores their requests in Redis with a key like `IP123.45.67.89`.

2. **Clean Up Old Requests**

   - Removes all requests that are older than `windowSize` seconds using:

     ```js
     redisClient.zRemRangeByScore(key, 0, windowTime);
     ```

   - This keeps only recent requests in memory.

3. **Check Request Count**

   - Counts how many requests are still in the allowed time window:

     ```js
     redisClient.zCard(key);
     ```

   - If this number is greater than or equal to `maxRequest`, the request is **blocked**.

4. **Record the New Request**

   - Adds the current request to Redis with a timestamp:

     ```js
     redisClient.zAdd(key, [
       { score: currentTime, value: `${currentTime}:${Math.random()}` },
     ]);
     ```

   - `score` is the timestamp in seconds.
   - `value` is a unique string (timestamp + random number).

5. **Set Expiry**

   - Ensures Redis automatically deletes the key after `windowSize` seconds:

     ```js
     redisClient.expire(key, windowSize);
     ```

6. **Continue or Block**

   - If allowed, it calls `next()` to go to the next middleware/route.
   - If blocked, it sends:

     ```
     Number of requests exceeded
     ```

---

### **Example**

- **Max Requests:** 10
- **Time Window:** 1 hour
- If a user sends **10 requests in 40 minutes**, all good ✅.
- On the **11th request**, they get blocked ❌ until the oldest request drops out of the 1-hour window.

---

### **Key Redis Commands Used**

| Command            | Purpose                                     |
| ------------------ | ------------------------------------------- |
| `zRemRangeByScore` | Remove old requests outside the time window |
| `zCard`            | Count number of requests in current window  |
| `zAdd`             | Add a new request with timestamp            |
| `expire`           | Set automatic deletion of key               |
