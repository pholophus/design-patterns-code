import { MysqlQueryBuilder } from "./MySQLQueryBuilder";
import { SQLQueryBuilder } from "./SQLQueryBuilder";

/**
 * This class represents the SQL query builder for PostgreSQL.
 */
export class PostgresQueryBuilder extends MysqlQueryBuilder {

    limit(start: number, offset: number): SQLQueryBuilder {
        if (this.query.type !== "select") {
            throw new Error("LIMIT can only be added to SELECT");
        }
        this.query.limit = ` LIMIT ${start} OFFSET ${offset}`;

        return this;
    }

    // + tons of other overrides...

}