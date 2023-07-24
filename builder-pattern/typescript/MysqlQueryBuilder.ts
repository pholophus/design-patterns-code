import { SQLQueryBuilder } from "./SQLQueryBuilder";

/**
 * This class represents the SQL query builder for MySQL.
 */
export class MysqlQueryBuilder implements SQLQueryBuilder {
    protected query: any;

    constructor() {
        this.query = {};
    }

    protected reset(): void {
        this.query = {};
    }

    /**
 * Sets the 'SELECT' clause of the SQL query.
 * @param table The table name to select from.
 * @param fields The array of field names to include in the 'SELECT' clause.
 * @returns The updated instance of the SQLQueryBuilder for method chaining.
 */
    select(table: string, fields: string[]): SQLQueryBuilder {
        this.reset();
        this.query.base = `SELECT ${fields.join(", ")} FROM ${table}`;
        this.query.type = "select";

        return this;
    }

    /**
     * Adds a 'WHERE' condition to the SQL query.
     * @param field The field name for the condition.
     * @param value The value to compare against in the condition.
     * @param operator The comparison operator (default is "=").
     * @returns The updated instance of the SQLQueryBuilder for method chaining.
     * @throws Error if 'WHERE' is used with unsupported query types.
     */
    where(field: string, value: string | number, operator: string = "="): SQLQueryBuilder {
        if (!["select", "update", "delete"].includes(this.query.type)) {
            throw new Error("WHERE can only be added to SELECT, UPDATE OR DELETE");
        }
        this.query.where = [...(this.query.where || []), `${field} ${operator} '${value}'`];

        return this;
    }

    /**
     * Adds a 'LIMIT' constraint to the SQL query.
     * @param start The start index of the 'LIMIT' constraint.
     * @param offset The number of rows to limit the result.
     * @returns The updated instance of the SQLQueryBuilder for method chaining.
     * @throws Error if 'LIMIT' is used with unsupported query types.
     */
    limit(start: number, offset: number): SQLQueryBuilder {
        if (this.query.type !== "select") {
            throw new Error("LIMIT can only be added to SELECT");
        }
        this.query.limit = ` LIMIT ${start}, ${offset}`;

        return this;
    }

    /**
     * Gets the final SQL query string.
     * @returns The generated SQL query string.
     */
    getSQL(): string {
        const { base, where, limit } = this.query;
        let sql = base;
        if (where && where.length > 0) {
            sql += ` WHERE ${where.join(" AND ")}`;
        }
        if (limit) {
            sql += limit;
        }
        sql += ";";
        return sql;
    }

}