Rails.application.routes.draw do
  resources :users, :only => [:edit, :update]
  get 'users/edit'

  get 'users/update'

  root 'messages#index'
  devise_for :users
end
