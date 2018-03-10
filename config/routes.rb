Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :groups, only: [:new, :create, :edit, :update, :index]
  resources :users, only: [:edit, :update]
end
