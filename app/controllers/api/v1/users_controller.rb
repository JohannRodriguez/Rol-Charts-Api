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
          render json: { status: 'USER_AUTH' }
        elsif @current_user
          render json: { status: 'BAD_PASSWORD'}
        else
          render json: { status: 'NO_USER_FOUND' }
        end
      end

      def create
        user = User.new(create_user_params)

        if user.save
          session[:user_id] = user.id
          session[:auth_status] = 'NOT_AUTH'
          session[:auth_time] = 0
          UsersMailer.registration_confirmation(user).deliver
          render json: { status: 'SUCCES'}
        else
          render json: { status: 'BAD_FIELD', error: user.errors }
        end
      end

      def update
        user = @current_user if @current_user === User.find_by(id: params[:id])

        if (Time.now.to_i - session[:auth_time]) > 18000
          session[:auth_status] = 'NOT_AUTH'
          render json: { status: 'NOT_AUTH' }
        elsif session[:auth_status] === 'AUTH' and user.status === 'ACTIVE' or user.status === 'SUSPENDED'
          if user.update(update_user_params)
            render json: { status: 'SUCCESS' }
          else
            render json: { status: 'BAD_FIELD', error: user.errors }
          end
        else
          render json: { status: 'NO_USER_FOUND' }
        end
      end

      def destroy
        user = @current_user if @current_user === User.find_by(id: params[:id])

        if (Time.now.to_i - session[:auth_time]) > 18000
          session[:auth_status] = 'NOT_AUTH'
          render json: { status: 'NOT_AUTH' }
        elsif user.destroy
          reset_session
          render json: { status: 'SUCCES' }
        else
          render json: { status: 'NO_USER_FOUND' }
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