<?php
$host = 'localhost'; // Change this to your DB host
$dbname = 'your_database_name'; // Change this to your database name
$user = 'your_db_username'; // Change this to your DB username
$password = 'your_db_password'; // Change this to your DB password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
