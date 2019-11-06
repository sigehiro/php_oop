//HTMLがよもこまれたら、かっこの中を実行します。
//$(function(){


$(function(){

  // $('.text-light').on('click', function() {
    // alert('vaccumをクリックしたよ！');
    // index.phpのJQ接続の確認。<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>  <script src="./assets/js/app.js"></script>の二つを代入

    $('#add-button').on('click',function(e){
      // alert('addが出るかな？');

      //formタグの送信を無効化する（二重投稿を防ぐため）
      e.preventDefault();

      //入力されたタスク名を取得
      let taskName = $('#input-task').val();
      // alert(taskName);

      //ajax開始  index.phpの４４行目,phpにはスーパーグローバル変数がある（元々用意してくれてる）$_POSTは連想配列。配列はo,1,2,で数えるが連想配列にはすでに名前がついている。 myadminに反映されている。DBに登録される。
      $.ajax({

        url:'create.php',
        type:'POST',
        dataType:'json',
        data:{
          //送信する値をかくブロック
          task:taskName
        }
      }).done((data) => {
            console.log(data);
            $('tbody').prepend(
              `<tr id='task-${data['id']}'>`+
                `<td>${data['name']}</td>` +
                `<td>${data['due_date']}</td>` +
                `<td>NOT YET</td>` +
                `<td> 
                    <a class="text-muted" href="edit.php?id=${data['id']}">
                    <i class="fas fa-child edit-icon"></i>EDIT</a>
                </td>` +
                `<td>
                    <a data-id="${data['id']}" class="text-muted delete-button" href="delete.php?id=${data['id']}">
                    <i class="fas fa-frown delete-icon"></i>DELETE</a>
                </td>`+
              `</tr>`
            );
            $('#input-task').val('');
      }).fail((error) => {
        console.log(error);
      })

    });

      //削除のボタンがクリックされたときの処理
      // $('.delete-button').on('click',function(e){
      //逆にこっちのコードは、ドキュメント（画面全体）が影響する書き方。
      $(document).on('click','.delete-button',function(e) {
      //二重化送信の無効化
      // alert('DELETE');
      e.preventDefault();


      //削除対象のIDを取得」
      //$(this)今イベントが実行されている本体
      //今回の場合は、クリックされたaタグ本体
      let selectedId = $(this).data('id');
      // alert(selectedId);

      //ajaxを開始
      $.ajax({
        url: 'delete.php',
        type: 'GET',
        dataType: 'json',
        data:{
          id: selectedId
        },
      }).done((data) => {
        console.log(data);
        console.log('Deleted');
        $('#task-'+data).fadeOut();
      }).fail((error) => {
        console.log(error);
      })


    });
  })