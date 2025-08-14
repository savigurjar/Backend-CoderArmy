
# 📌 Rate Limiter Middleware 

## 🔹 Purpose

This rate limiter is designed to **control how many requests** a single user (IP address) can make to your server within a set time frame.
In this case: **Max 60 requests per hour**.

---

## 🔹 How It Works (Step-by-Step)

1. **Identify the user**

   * Each incoming request has an IP address.
   * We use that IP as a unique identifier.

2. **Count requests in Redis**

   * Redis stores a counter for each IP.
   * Every time the same IP sends a request, the counter increases.

3. **Set a time limit (TTL)**

   * When an IP is seen for the first time, a timer is set in Redis (1 hour).
   * After the timer expires, Redis deletes the counter automatically.

4. **Check the limit**

   * If the counter goes above **60** within that hour, the user is blocked.
   * If it’s below 60, the request is allowed.

5. **Pass or block the request**

   * Requests under the limit go to the next part of your app.
   * Requests above the limit get an error saying the limit was exceeded.

---

## 🔹 Why Use It?

* Protects your API from abuse or spam.
* Prevents denial-of-service attacks from a single IP.
* Keeps your server running smoothly.

---

## 🔹 Key Points

* Works **per IP address**.
* Counter resets automatically after the set time (1 hour here).
* Stores counts **in Redis** for fast access.
* Can be applied to all routes or specific ones.


