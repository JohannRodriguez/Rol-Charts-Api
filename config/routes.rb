Rails.application.routes.default_url_options[:host] = 'localhost:3000'
Rails.application.routes.draw do
  resources :pages, only: [:index]
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :sessions, only: [:create]
      resources :users, only: [:index, :create, :update, :destroy]

        get :log_status, to: 'sessions#log_status'
        delete :logout, to: 'sessions#logout'
        
        get :confirm_email, to: 'users#confirm_email'
        patch :email_correction, to: 'users#email_correction'

    end
  end
end
