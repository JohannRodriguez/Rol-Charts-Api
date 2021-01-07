Rails.application.routes.default_url_options[:host] = 'localhost:3000'
Rails.application.routes.draw do
  resources :sessions, only: [:create]
  get :log_status, to: 'sessions#log_status'
  delete :logout, to: 'sessions#logout'

  resources :users, only: [:show, :create, :update, :destroy]
  get :confirm_email, to: 'users#confirm_email'
  patch :email_correction, to: 'users#email_correction'
end
