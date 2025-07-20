


# MongoDB Internals - README

## Overview

This document provides a high-level summary of MongoDB's internal architecture and core components. It is useful for understanding how MongoDB manages data storage, queries, and replication internally.

---

## 1. Storage Engine

MongoDB uses a **Storage Engine** to manage how data is stored on disk.

* **Default Engine (WiredTiger):**

  * Document-level concurrency control
  * Compression for storage efficiency
  * Checkpointing and journaling for crash recovery

---

## 2. Data Model

MongoDB stores data in:

* **Databases** → Collections → Documents
* Documents are **BSON** (Binary JSON) objects

---

## 3. Query Execution

* Uses a **Query Planner** to decide the best index and execution plan
* Queries are executed using a pipeline of stages (e.g., COLLSCAN, IXSCAN)
* Query results can be cached

---

## 4. Indexing

* Supports **B-tree-based indexes**
* Types:

  * Single Field
  * Compound
  * Multikey (for arrays)
  * Text, GeoSpatial, Hashed

---

## 5. Replication

* **Replica Sets** with a Primary and multiple Secondaries
* Uses **Oplog (Operation Log)** for replication
* Automatic Failover with Election

---

## 6. Sharding

* Data is split across **Shards** based on Shard Key
* Managed by **Config Servers** and **mongos Router**

---

## 7. Write Concerns & Read Concerns

* Controls data durability and consistency
* Write Concern: e.g., `majority`, `w:1`
* Read Concern: e.g., `local`, `majority`, `linearizable`

---

## 8. Journaling & Crash Recovery

* Journaling writes are flushed every 100ms (default)
* Recovery process uses journal files to restore consistency

---

## 9. Security Features

* Authentication: SCRAM, LDAP, x.509
* Authorization: Role-based access control
* TLS/SSL support

---

## 10. Tools & Utilities

* `mongodump` / `mongorestore` for backup
* `mongoexport` / `mongoimport` for data export/import
* `mongotop` / `mongostat` for monitoring

---

## References

* [MongoDB Official Docs](https://www.mongodb.com/docs/)
* [MongoDB Architecture Guide](https://www.mongodb.com/scale/mongodb-architecture)

---


