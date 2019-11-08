<?php
//Todo.phpの読み込み
// <!-- タスクを完了させる処理をかく -->
require_once 'Models/Todo.php';

//完了ボタンがクリックされたタスクをIDを取得
$id = $_GET['id'];

//Todoクラスをインスタンス化（設計図から実態を作る）
$todo = new Todo();

//doneメソッドを実行
$todo->done($id);

//更新したタスクのIDをjsonにして返す
echo json_encode($id);