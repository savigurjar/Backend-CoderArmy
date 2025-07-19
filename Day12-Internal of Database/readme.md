

---

### **CAP Theorem (Brewer's Theorem)**

The **CAP Theorem** states that in a **distributed database/system**, it is impossible to simultaneously guarantee all three of the following properties. You can only have **two at a time**:

1. **Consistency (C)**

   * **Definition:** Every read receives the most recent write or an error.
   * **Implication:** All nodes show the same data at the same time, like in a single-node database. Updates are immediately visible to all clients.

2. **Availability (A)**

   * **Definition:** Every request (read or write) receives a (non-error) response, even if it might not reflect the latest write.
   * **Implication:** The system remains responsive at all times. But in some cases (like a network issue), the data may be stale.

3. **Partition Tolerance (P)**

   * **Definition:** The system continues to function despite network partitions (communication breaks between nodes).
   * **Implication:** Even if some parts of the system cannot communicate, the system as a whole does not crash.

---

### You can choose **any two**, but **never all three at once**:

| Combination | Meaning                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------- |
| **CP**      | Consistency + Partition Tolerance (but may sacrifice Availability)                                |
| **CA**      | Consistency + Availability (but not Partition Tolerant) — *only practical in single-node systems* |
| **AP**      | Availability + Partition Tolerance (but may sacrifice Consistency)                                |

---

### Example in Real Systems:

* **CP:** HBase, MongoDB (in certain modes)
* **CA:** Traditional RDBMS (like MySQL) when not distributed
* **AP:** Cassandra, Couchbase, DynamoDB

---

If you want, I can explain these combinations with real-life analogies or simple diagrams.
