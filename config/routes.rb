Rails.application.routes.draw do
  resources :sessions, only: [:create]
  get :log_status, to: 'sessions#log_status'
  delete :logout, to: 'sessions#logout'

  resources :users, only: [:show, :create, :update, :destroy]
  get :auth_user, to: 'users#authenticate_user'
end
