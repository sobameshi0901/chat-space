class UsersController < ApplicationController
  def edit
    @user = User.find(params[:user_id])
  end

  def update
  end
end
