class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  mount_uploader :image, ImageUploader
  validates :content_or_image, presence: true

  def self.new_messages(group, last_message_id)
    new_message = Message.where("group_id = ? and id > ?", group, last_message_id)
    return new_message
  end

  private
  def content_or_image
    content.presence || image.presence
  end
end
