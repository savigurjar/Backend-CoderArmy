

# B+ Tree for Indexing

*Backend Development — Lecture 14*

### What is a B+ Tree?

* A **B+ Tree** is a type of **self-balanced search tree** used in databases.
* It stores **sorted data** and allows **fast searching, inserting, and deleting**.
* Used for **indexing in databases** like **MongoDB** and **MySQL**.

---

### Why do we use B+ Tree for Indexing?

✅ Helps find data **quickly** — just like searching in a dictionary.
✅ Supports **range queries** easily (like finding values between 10 and 20).
✅ Data remains **sorted and balanced** — no slowdowns over time.
✅ Reduces the number of disk reads (which is slow), so performance improves.

---

### B+ Tree Structure

* **Internal Nodes:**

  * Act like guides or index pages.
  * They don't store actual data, just keys to help find the leaf nodes.

* **Leaf Nodes:**

  * Store **actual data (records)**.
  * All leaves are connected like a **linked list** for fast access in order.

---

### Example (Simple View):

```
        [20 | 40]
        /    |    \
     [10]  [30]  [50, 60, 70]
```

* You search top to bottom — the leaf nodes have actual data.
* All leaf nodes are linked together.

---

### B+ Tree vs. B-Tree

| B-Tree                        | B+ Tree                 |
| ----------------------------- | ----------------------- |
| Data at internal & leaf nodes | Data only at leaf nodes |
| Slower range queries          | Faster range queries    |
| No linked leaf nodes          | Linked leaf nodes       |

---

### Where is B+ Tree used?

* **MongoDB Indexes**
* **SQL Indexes (MySQL, PostgreSQL)**
* **File systems like NTFS**

---

### Summary:

B+ Tree is a smart way for databases to search and access data quickly without slowing down, even when handling **huge amounts of data**.


