$(function(){
  $(document).on('turbolinks:load',function(){
    function appendUser(user){
      var html =`
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${ user.name }</p>
        <a data-user-id="${ user.id }", data-user-name="${ user.name }", class="user-search-add chat-group-user__btn chat-group-user__btn--add">追加</a>
      </div>`
      $('.user-search-result').append(html);
    }

    function addUserGroup(user_id, user_name){
      var html =`
      <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ user_id }'>
        <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
        <p class='chat-group-user__name'>${ user_name }</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
      $('.js-add-user').append(html);
    }

    $('#user-search-field').on('keydown', function(){
      var input = $('#user-search-field').val();
      console.log(input)
      $.ajax({
        url: '/users',
        type: 'GET',
        data: { keyword: input},
        dataType: 'json',
      })
      .done(function(users){
        $('.user-search-result').empty();
        if (users.length !==0){
          users.forEach(function(user){
            appendUser(user);
          });
        }
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました');
      })
    });

    $('.user-search-result').on("click", ".chat-group-user__btn--add",function(e){
      e.preventDefault();
      var user_id = $(this).attr('data-user-id');
      var user_name = $(this).attr('data-user-name');
      $(this).parent().remove();
      addUserGroup(user_id, user_name);
    });

    $('.chat-group-user').on("click", ".chat-group-user__btn--remove", function(){
      $(this).parent().remove();
    });
  });
});