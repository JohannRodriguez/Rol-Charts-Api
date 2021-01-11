module Api
  module V1
    class UsersController < ApplicationController
      include CurrentUserConcern
      
      def index
      end

      def authenticate
        auth_user = @current_user.try(:authenticate, params[:user][:password])

        if auth_user
          session[:auth_status] = 'AUTH'
          session[:auth_time] = Time.now.to_i
          render json: { status: '0-11' }
        elsif @current_user
          render json: { status: '0-01'}
        else
          render json: { status: '0-00' }
        end
      end

      def create
        user = User.new(create_user_params)

        if user.save
          session[:user_id] = user.id
          UsersMailer.registration_confirmation(user).deliver
          render json: :create
        else
          render json: { status: 400, error: user.errors }
        end
      end

      def update
        user = @current_user
        if (Time.now.to_i - session[:auth_time]) > 18000
          session[:auth_status] === 'NOT_AUTH'
          render json: { authenticated: 'NOT_AUTH' }
        elsif session[:auth_status] === 'AUTH' and user.status === 'ACTIVE' or user.status === 'SUSPENDED'
          if user.update(update_user_params)
            render json: :udpate
          else
            render json: { status: 400, error: user.errors }
          end
        else
          render json: { status: 500 }
        end
      end

      def destroy
        user = @current_user.try(:authenticate, params[:user][:password]) if @current_user

        if (Time.now.to_i - session[:auth_time]) > 18000
          session[:auth_status] === 'NOT_AUTH'
          render json: { authenticated: 'NOT_AUTH' }
        elsif user.destroy
          reset_session
          render json: :destroy
        else
          render json: { status: 400 , error: user.errors }
        end
      end

      private

      def create_user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation)
      end

      def update_user_params
        params.require(:user).permit(:username, :password, :password_confirmation)
      end
    end
  end
end