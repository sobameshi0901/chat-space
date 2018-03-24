$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    var image = ""
    if(message.image !== null){
      image = `<img src="${ message.image }", class ="lower-message__image">`
    }
    var html = `<div class="chatBox", data-message-id=${ message.message_id }>
  <div class="chatBox__name">
    <p>${ message.user_name }</p>
  </div>
  <div class="chatBox__date">
    <p>${ message.message_created }</p>
  </div>
  <div class="chatBox__text">
    <p>${ message.content }</p>
  </div>
    ${ image }
  </div>
    `
    return html;
  }


  function autoUpdate(){
    var href = window.location.href
    var last_message = $('.chatBox').last().attr('data-message-id');
    console.log(last_message);
    $.ajax({
      url: href,
      type: "GET",
      data: {last_message_id: last_message},
      dataType: 'json',
    })
    .done(function(messages){
      if(messages.length !==0){
        messages.forEach(function(message){
          var html = buildHTML(message);
          $('.chatMain').append(html);
        });
      }
      scrollToBottom();
    })
    .fail(function(){
      alert('読み込みにエラーが発生しました');
    })
  }

  function scrollToBottom(){
    var position = $('.chatMain')[0].scrollHeight;
    $('.chatMain').animate({scrollTop: position });
  }





  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href;
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chatMain').append(html);
      $('#message_image').val('');
      $('#message_content').val('');
      $('.postBox__button').removeAttr("disabled");
      scrollToBottom();
    })
    .fail(function(){
      alert('投稿できませんでした。');
    })
  });


  var interval = setInterval(function() {
  if (document.URL.match("/groups/.*/messages")) {
    autoUpdate();
  } else {
    clearInterval(interval);
  }} , 5 * 1000 );

});
