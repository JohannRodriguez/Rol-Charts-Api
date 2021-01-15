module Api
  module V1
    class SessionsController < ApplicationController
      include CurrentUserConcern
    
      def create
        user = User.find_by(email: params[:user][:email])
        auth_user = user.try(:authenticate, params[:user][:password])
    
        if auth_user
          session[:user_id] = user.id
          session[:auth_status] = 'NOT_AUTH'
          session[:auth_time] = 0
          render json: {
            status: 'SUCCESS',
            log: 'LOGGED_IN',
            user: {
              id: auth_user.id,
              username: auth_user.username,
              status: auth_user.status,
              email: auth_user.email,
            }
          }
        elsif user
          render json: { status: 'BAD_PASSWORD' }
        else
          render json: { status: 'BAD_USER' }
        end
      end
    
      def log_status
        if @current_user
          render :log_status
        else
          render json: {
            log: 'NOT_LOGGED_IN'
          }
        end
      end
    
      def logout
        reset_session
        render json: { logout: 'SUCCESS' }
      end
    end
  end
end
