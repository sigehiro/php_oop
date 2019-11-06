<?php

require_once('Models/Todo.php');

$id = $_GET['id'];

$todo = new Todo();

$todo->delete($id);

echo json_encode($id);


// header('Location: index.php');

?>