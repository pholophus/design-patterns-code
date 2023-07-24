import { SQLQueryBuilder } from "./SQLQueryBuilder";
import { MysqlQueryBuilder } from "./MySQLQueryBuilder";
import { PostgresQueryBuilder } from "./PostgresQueryBuilder";

/**
 * Note that the client code uses the builder object directly. A designated
 * Director class is not necessary in this case because the client code needs
 * different queries almost every time, so the sequence of the construction
 * steps cannot be easily reused.
 *
 * Since all our query builders create products of the same type (which is a
 * string), we can interact with all builders using their common interface.
 * Later, if we implement a new Builder class, we will be able to pass its
 * instance to the existing client code without breaking it thanks to the
 * SQLQueryBuilder interface.
 */
function clientCode(queryBuilder: SQLQueryBuilder): void {
    // ...

    const query = queryBuilder
        .select("users", ["name", "email", "password"])
        .where("age", 18, ">")
        .where("age", 30, "<")
        .limit(10, 20)
        .getSQL();

    console.log(query);

    // ...
}

console.log("Testing MySQL query builder:");
clientCode(new MysqlQueryBuilder());

console.log("\n\n");

console.log("Testing PostgreSQL query builder:");
clientCode(new PostgresQueryBuilder());
