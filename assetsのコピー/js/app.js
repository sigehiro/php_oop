$(function () {

    //削除

    //idがjs-delete-btnで始まるIDがクリックされたとき
    $(document).on('click', '[id^="js-delete-btn-"]', function (e) {
        
        //eはクリックされた要素
        //クリックされた要素のデフォルトの機能(別ページへ飛ぶ)を無効にする
        e.preventDefault();

        //idを取得
        //クリックされた要素のidの15文字目以降を取得
        let id = $(this).attr('id').substr('14');

        deleteTask(id);
        
    });


    function deleteTask(id) {
        //リクエスト先、HTTPメソッド、受け取るデータ型など指定
        $.ajax({
            url: 'delete.php?id=' + id,
            type: 'GET',
            dataType: 'json'
        })
        .then(
            //成功した場合の処理
            function (isDeleted) {
                //削除が成功した場合はtrue, 失敗した場合はfalse
                //app.js → delete.php → Todoクラスのdeleteメソッドという順番で実行される
                //Todoクラスのdeleteメソッド → delete.php → app.jsという順番で結果が返ってくる
                //返ってくる結果は(今回は)削除が成功したかどうか
                //成功した場合はtrue, 失敗した場合はfalse
                if (isDeleted) {
                    //画面から削除
                    deleteDOM(id);
                }
                
            },
            //失敗した場合の処理
            function () {
                console.log('error');
            }
        )
    }

    function deleteDOM(id) {
        $('#js-task-' + id).remove();
    }


    //追加
    $(document).on('click', '#js-add-task', function (e) {

        e.preventDefault();
        let task = $('#js-task')
        
        createTask(task.val());
        
        //入力欄を空にする
        task.val('');
    });

    function createTask(task) {
        $.ajax({
            url: 'create.php',
            type: 'POST',
            dataType: 'json',
            data: {
                task: task
            }
        })
        .then(
            function (task) {
                renderTask(task);
            },
            function () {
                console.log('error');
            }
        )        
    }

    //画面に追加したtaskを表示する
    function renderTask(task) {
        $('tbody').prepend(
            `<tr id="js-task-${task.id}">` +
            `<td>${task.name}</td>` +
            `<td>${task.due_date}</td>` +
            `<td>` +
                `<a class="text-success" href="edit.php?id=${task.id}">EDIT</a>` +
            `</td>` +
            `<td>` +
                `<a class="text-danger" href="" id="js-delete-btn-${task.id}">DELETE</a>` +
            `</td>` +
        `</tr>`
        );
    }

})