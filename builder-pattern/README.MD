
# Builder Pattern

Builder is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using the same construction code.






## Real World Example

One of the best applications of the Builder pattern is an SQL query builder. The builder interface defines the common steps required to build a generic SQL query. On the other hand, concrete builders, corresponding to different SQL dialects, implement these steps by returning parts of SQL queries that can be executed in a particular database engine.


## Running Project

For php, run the following command

```bash
  php main.php
```

For ts, run the following command

```bash
  ts-node main.ts
```

Expected result for both

```bash
  Testing MySQL query builder:
  SELECT name, email, password FROM users WHERE age > '18' AND age < '30' LIMIT 10, 20;

  Testing PostgresSQL query builder:
  SELECT name, email, password FROM users WHERE age > '18' AND age < '30' LIMIT 10 OFFSET 20;
```

