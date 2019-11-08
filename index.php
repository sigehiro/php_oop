
<?php
    // require_once 'function.php';
    require_once'function.php';
    // require_once 'Models/Todo.php';
    require_once'Models/Todo.php';

    //Todoクラスのインスタンス化
    $todo = new Todo();

    //DBからデータを全件取得
    $tasks = $todo->all();

    // echo '<pre>';
    // var_dump($tasks);
    // exit();

?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="assets/css/reset.css">
  <link rel="stylesheet" href="./assets/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="assets/css/style.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">

</head>
<body>
<header class="px-5 bg-success">
    <nav class="navbar navbar-dark">
        <a href="index.php" class="navbar-brand">TODO APP</a>
        <div class="justify-content-end">
            <span class="text-light">
                Vaccum
            </span>
        </div>
    </nav>
</header>
<main class="container py-5">
    <section>
        <form class="form-row justify-content-center" action="create.php" method="POST">
            <div class="col-10 col-md-6 py-2 add-todo">

                <input id ="input-task" type="text" class="form-control" placeholder="ADD TODO" name="task">
            </div>
            <div class="py-2 col-md-3 col-10">
                <button id ="add-button" type="submit" class="col-12 btn btn-success">ADD</button>
            </div>
        </form>
    </section>

    <section class="mt-5">
  <table class="table table-hover">
      <thead>
        <tr class="bg-success text-light">
            <th class=>TODO</th>
            <th>DUE DATE</th>
            <th>STASTUS</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
      </thead>
      <tbody>
        <!--ここ以下後ほど繰り返し処理する-->
        <?php foreach ($tasks as $task):?>
        <tr id='task-<?php echo h($task['id']);?>'>
            <td><?php echo h($task['name']); ?></td>
            <td><?php
                // echo $task['due_date'];
                echo h(date('Y年m月d日', strtotime($task['due_date'])));
                ?></td>
                <?php if($task['done_flg'] ==0):?>
                   <td id="task-status-<?php echo h($task['id']); ?>">NOT YET</td>
                <?php else: ?>
                   <td> DONE</td>
                <?php endif; ?>
            <td>
                <a class="text-muted" href="edit.php?id=<?php echo h($task['id']); ?>">
                <i class="fas fa-child edit-icon"></i>EDIT</a>
                <!-- i classはfont awesome から無料でひっぱてきたやつ</i>より後ろのは画面に表示されている文字なのでアイコンをタップして欲しい場合には記入しない。edit-iconは自分で追加している。style.cssにてアイコンの色を指定している -->
            </td>
            <td>
                <a data-id="<?php echo h($task['id']); ?>" class="text-muted delete-button" href="delete.php?id=<?php echo h($task['id']); ?>"><i class="fas fa-frown delete-icon"></i>DELETE</a>
            </td>
            <td>
                <?php if($task['done_flg'] ==0):?>
                   <button data-id="<?php echo h($task['id']); ?>" class="btn btn-info done-button">完了</button>
                <?php endif; ?>
            </td>
        </tr>
        <?php endforeach; ?>
        <!--/ ここ以上後ほど繰り返し処理する-->
      </tbody>
  </table>
    </section>
</main>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="./assets/js/app.js"></script>
<!-- <script src="./assets/js/app.js"></script>の書き方。./は同じ階層で。../は一つ前の階層 -->
</body>
</html>


