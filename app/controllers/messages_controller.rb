class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    @new_messages = Message.new_messages(params[:group_id], params[:last_message_id])
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = Message.new(message_params)
    @message.save!
      respond_to do |format|
        format.html {redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'}
        format.json
      end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image, ).merge(group_id: params[:group_id], user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
