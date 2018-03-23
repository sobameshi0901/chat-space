Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:index]
  root 'groups#index'
  resources :groups, only: [:new, :create, :edit, :update, :index] do
    resources :messages, only: [:index, :create]
  end
  resources :users, only: [:edit, :update]
end
