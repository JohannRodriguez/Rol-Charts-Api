Rails.application.routes.default_url_options[:host] = 'localhost:3000'
Rails.application.routes.draw do
  root 'pages#index'

  namespace :api, defaults: { format: 'json'} do
    namespace :v1 do
      resources :characters, only: [:index, :show, :create, :update, :destroy]

      resources :sessions, only: [:create]
      get :log_status, to: 'sessions#log_status'
      delete :logout, to: 'sessions#logout'

      resources :users, only: [:index, :show, :create, :update, :destroy]
      post :authenticate, to: 'users#authenticate'

      post :email_confirmation, to: 'emails#email_confirmation'
      post :email_resend, to: 'emails#email_resend'
      patch :email_correction, to: 'emails#email_correction'
    end
  end

  get '*path', to: 'pages#index', via: :all 
end
