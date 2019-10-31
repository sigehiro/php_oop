<?php

require_once('function.php');
require_once('Models/Todo.php');

$id = $_GET['id'];

$todo = new Todo();

$todo->delete($id);


header('Location: index.php');

?>