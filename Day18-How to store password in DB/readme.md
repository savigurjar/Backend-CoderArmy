https://www.npmjs.com/package/mongodb

````markdown
# 🔐 Bcrypt Password Hashing Example

This Node.js script demonstrates how to securely hash passwords using `bcrypt`, along with generating a salt and verifying the hashed password.

## 📦 Requirements

- Node.js
- `bcrypt` package

Install bcrypt:

```bash
npm install bcrypt
````

## 📄 Description

### 1. Hashing with Salt

We use `bcrypt.genSalt()` to generate a salt and then hash the password using `bcrypt.hash()`.

### 2. Comparing Password

Once hashed, we compare the original password with the hashed version using `bcrypt.compare()` to verify authenticity.

## 📁 Example Code

```js
const bcrypt = require("bcrypt");
const password = "savi!!@1230!";

async function Hashing() {
  const salt = await bcrypt.genSalt(10); // 🔧 Generate salt
  const hashpass = await bcrypt.hash(password, salt); // 🔐 Hash password with salt

  const ans = await bcrypt.compare(password, hashpass); // ✅ Compare password with hash
  console.log(ans); // true if matched
}
Hashing();
```

## ✅ Output

```bash
true
```

Even for the **same password**, the hash will be **different every time** because a new random salt is generated each time.

## 🔄 Sample Hashes for Same Password

```
$2b$10$db7JlN7J7zL0cWvwqj27oOIER//pGNwRvbBry0/VQ3hGD3rxCvoqO
$2b$10$JWMAvaFC2LTlVTm827XJ1u.YgsS5iW1dLtCnOQMpss5oXenBPbLOq
```

These hashes look different but will both validate the same password.

---

## 📚 Summary

* `bcrypt.genSalt(rounds)` — generates a salt with a given number of rounds.
* `bcrypt.hash(password, salt)` — hashes a password with the salt.
* `bcrypt.compare(password, hash)` — compares a plain password with its hash.

> ✅ Always hash passwords before storing them in your database.


