if @new_messages
  json.array! @new_messages do | message|
    json.content message.content
    json.image message.image.url
    json.user_name message.user.name
    json.message_created message.created_at
    json.message_id message.id
  end
end