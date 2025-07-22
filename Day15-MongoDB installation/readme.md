const db = url(
  "mongodb+srv://savigurjar:Hunter%403012@cluster0.rapodec.mongodb.net/"
);

// @ ke bad cluster smjta h , Hunter ko hi password smjta h 

// homework:
//  1. Databse na krta ho , what will happen : will it create DB for you or throw an error?

// 2. collection name krta ho : What will happen : Will it create collection for you or throw an error?




---

### 1️⃣ If **Database name does not exist** —

**What will happen when you connect?**

* ✅ **MongoDB will NOT throw an error.**
* ✅ The **database will be created automatically** when you insert the first document.
* 📝 If you just connect and do nothing ➔ It will stay virtual (not shown in Compass).

> **MongoDB creates the database lazily (on first use).**

---

### 2️⃣ If **Collection name does not exist** —

**What will happen when you access collection?**

* ✅ You can access it with `db.collection('name')` without error.
* ✅ **Collection will also be created automatically** when you insert a document.
* 📝 If you don’t insert anything ➔ It won’t show up in Compass.

---

### ✅ Example:

```js
const db = client.db('NewDB');          // OK, even if 'NewDB' doesn't exist yet
const collection = db.collection('user'); // OK, even if 'user' doesn't exist yet
await collection.insertOne({ name: 'Luffy' }); // Now 'NewDB' & 'user' will be created
```

---

### ✅ Summary:

| Case                     | What happens                   |
| ------------------------ | ------------------------------ |
| Database doesn't exist   | Will be created on first write |
| Collection doesn't exist | Will be created on first write |
| No write (only read)     | Nothing is created, no error   |

---


