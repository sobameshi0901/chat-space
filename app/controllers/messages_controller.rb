class MessagesController < ApplicationController
  def index
    @message = Message.new
    @group = Group.find(params[:group_id])
    @messages = @group.messages
    binding.pry
  end

  def create
    message = Message.new(message_params)
    if message.save
      redirect_to action: 'index'
    else
      render :index, alert: 'メッセージを入力してください'
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image, ).merge(group_id: params[:group_id], user_id: current_user.id)
  end
end
