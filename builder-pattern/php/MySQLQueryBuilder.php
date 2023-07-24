<?php
include_once "./SQLQueryBuilder.php";

class MySQLQueryBuilder implements SQLQueryBuilder
{
    protected $query;

    protected function reset(): void
    {
        $this->query = new stdClass();
    }

    /**
     * Set the 'SELECT' clause of the SQL query.
     *
     * @param string $table The table name to select from.
     * @param array $fields The array of field names to include in the 'SELECT' clause.
     *
     * @return SQLQueryBuilder The updated instance of the SQLQueryBuilder for method chaining.
     */
    public function select(string $table, array $fields): SQLQueryBuilder
    {
        $this->reset();
        $this->query->base = "SELECT " . implode(", ", $fields) . " FROM " . $table;
        $this->query->type = 'select';

        return $this;
    }

    /**
     * Add a 'WHERE' condition to the SQL query.
     *
     * @param string $field The field name for the condition.
     * @param string $value The value to compare against in the condition.
     * @param string $operator The comparison operator (default is "=").
     *
     * @return SQLQueryBuilder The updated instance of the SQLQueryBuilder for method chaining.
     *
     * @throws Exception if 'WHERE' is used with unsupported query types.
     */
    public function where(string $field, string $value, string $operator = '='): SQLQueryBuilder
    {
        if (!in_array($this->query->type, ['select', 'update', 'delete'])) {
            throw new Exception("WHERE can only be added to SELECT, UPDATE and DELETE");
        }

        $this->query->where[] = "$field $operator '$value'";

        return $this;
    }

    /**
     * Add a 'LIMIT' constraint to the SQL query.
     *
     * @param int $start The start index of the 'LIMIT' constraint.
     * @param int $offset The number of rows to limit the result.
     *
     * @return SQLQueryBuilder The updated instance of the SQLQueryBuilder for method chaining.
     *
     * @throws Exception if 'LIMIT' is used with unsupported query types.
     */
    public function limit(int $start, int $offset): SQLQueryBuilder
    {
        if (!in_array($this->query->type, ['select'])) {
            throw new Exception("LIMIT can only be added to SELECT");
        }

        $this->query->limit = " LIMIT $start , $offset";

        return $this;
    }

    /**
     * Get the final SQL query string.
     *
     * @return string The generated SQL query string.
     */
    public function getSQL(): string
    {
        $query = $this->query;
        $sql = $query->base;
        if (!empty($query->where)) {
            $sql .= " WHERE " . implode(' AND ', $query->where);
        }
        if (isset($query->limit)) {
            $sql .= $query->limit;
        }
        $sql .= ";";
        return $sql;
    }

}
?>