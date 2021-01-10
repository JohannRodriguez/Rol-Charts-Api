module Api
  module V1
    class SessionsController < ApplicationController
      include CurrentUserConcern
    
      def create
        user = User
                .find_by(email: params[:user][:email])
                .try(:authenticate, params[:user][:password])
    
        if user
          session[:user_id] = user.id
          render :create
        else
          render json: { status: 400, error: "Couldn't find user" }
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
