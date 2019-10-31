<?php

require_once'Models/Todo.php';

// スーパーグローバル変数を使ってtask.id を取得するコードをかく。
$id = $_POST['id'];
$task = $_POST['task'];

// var_dump($id);
// var_dump($task);

$todo = new Todo();
$todo->update($task,$id);

header('Location: index.php');