/**
 * The Builder interface declares a set of methods to assemble an SQL query.
 *
 * All of the construction steps are returning the current builder object to
 * allow chaining: builder.select(...).where(...).limit(...)
 */
export interface SQLQueryBuilder {
    select(table: string, fields: string[]): SQLQueryBuilder;
    where(field: string, value: string | number, operator?: string): SQLQueryBuilder;
    limit(start: number, offset: number): SQLQueryBuilder;
  
    // +100 other SQL syntax methods...
  
    getSQL(): string;
}