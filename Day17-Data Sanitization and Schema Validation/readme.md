https://www.npmjs.com/package/mongodb


### 📘 **README.md**

```markdown
# 📦 Instagram-like User API (CRUD using Express & MongoDB)

This is a basic Node.js REST API for managing users, similar to a small part of an Instagram backend. It performs **CRUD operations** using **Express.js** and **MongoDB with Mongoose**.

---

## 🚀 Features

- ✅ Register new user (`POST /register`)
- ✅ View all users (`GET /info`)
- ✅ View single user by ID (`GET /user/:id`)
- ✅ Update user by ID (`PATCH /user`)
- ✅ Delete user by ID (`DELETE /user/:id`)
- 📦 Validates mandatory fields on registration
- 🧪 Mongoose schema validation (lengths, required, enum, etc.)

---

## 📁 Project Structure

```

.
├── Models/
│   └── users.js          # Mongoose User schema
├── database.js           # DB connection
├── index.js              # Main Express app
└── README.md             # You're here!

````

---

## 📦 Requirements

- Node.js
- MongoDB (Cloud or Local)

---

## 🔧 Installation & Usage

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/.git

# 2. Install dependencies

npm install

# 3. Start the server
node index.js
````

Your API will be running at: `http://localhost:4000`

---

## 🛠 API Endpoints

### ➕ Register New User

```http
POST /register
```

**Body (JSON):**

```json
{
  "firstName": "Savi",
  "emailId": "savi@example.com",
  "age": 22
}
```

---

### 📥 Get All Users

```http
GET /info
```

---

### 📄 Get User by ID

```http
GET /user/:id
```

---

### ✏️ Update User

```http
PATCH /user
```

**Body:**

```json
{
  "_id": "user_id_here",
  "firstName": "Updated Name"
}
```

---

### ❌ Delete User

```http
DELETE /user/:id
```

---

## 🧠 Notes

* Email is **immutable** and **must be unique**
* Gender supports: `male`, `female`, `others`
* Default photo URL used if none provided
* Fields validated before writing to DB

---




