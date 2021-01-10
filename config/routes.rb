Rails.application.routes.default_url_options[:host] = 'localhost:3000'
Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :sessions, only: [:create]
      resources :users, only: [:index, :create, :update, :destroy]

        get :log_status, to: 'sessions#log_status'
        delete :logout, to: 'sessions#logout'
        
        post :email_confirmation, to: 'emails#email_confirmation'
        post :email_resend, to: 'emails#email_resend'
        patch :email_correction, to: 'emails#email_correction'
    end
  end

  get '*path', to: 'pages#index', via: :all 
end
