$(function(){

  // $('.text-light').on('click', function() {
    // alert('vaccumをクリックしたよ！');
    // index.phpのJQ接続の確認。<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>　　<script src="./assets/js/app.js"></script>の二つを代入

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
              `<tr>`+
                `<td>${data['name']}</td>` +
                `<td>${data['due_date']}</td>` +
                `<td>NOT YET</td>` +
                `<td> 
                    <a class="text-muted" href="edit.php?id=${data['id']}">
                    <i class="fas fa-child edit-icon"></i>EDIT</a>
                </td>` +
                `<td>
                    <a class="text-muted" href="delete.php?id=${data['id']}">
                    <i class="fas fa-frown delete-icon"></i>DELETE</a>
                </td>`+
              `</tr>`
            );
      }).fail((error) => {

      })

    });

  })