<?php
class DbManager
{
    public $dbh;
    public function connect()
    {
//DBに接続 phpmyadminの作成
$host = 'localhost';
$dbname = 'Todo';
$charset = 'utf8mb4';
$user = 'root';
//パスワードが必要な人は追記すること。
$password = '';
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];
$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
try {
    $this->dbh = new PDO($dsn, $user, $password, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int) $e->getCode());
}
    }
}
