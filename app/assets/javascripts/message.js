$(function(){
  $(document).on('turbolinks:load',function(){
  function buildHTML(message){
    var image = ""
    if(message.image !== null){
      image = `<img src="${ message.image }", class ="lower-message__image">`
    }
    var html = `<div class="chatBox">
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
      var position = $('.chatMain')[0].scrollHeight;
      $('.chatMain').animate({scrollTop: position });

    })
    .fail(function(){
      alert('投稿できませんでした。');
    })
  })
});
});
