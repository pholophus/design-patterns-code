<?php
    include_once "./MySQLQueryBuilder.php";

    $sql = new MySQLQueryBuilder();
    $query = $sql->select("users", ["name", "email", "password"])
    ->where("age", 18, ">")
    ->where("age", 30, "<")
    ->limit(10, 20)
    ->getSQL();

    echo $query;
?>