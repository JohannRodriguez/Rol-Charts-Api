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
          render json: { status: '0-00' }
        elsif user
          render json: { status: '0-01' }
        else
          render json: { status: '0-11' }
        end
      end
    
      def log_status
        if @current_user
          render :log_status
        else
          render json: {
            loged_in: false,
          }
        end
      end
    
      def logout
        reset_session
        render json: { status: 200, logged_out: true }
      end
    end
  end
end
