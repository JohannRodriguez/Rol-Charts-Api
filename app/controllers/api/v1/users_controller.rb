module Api
  module V1
    class UsersController < ApplicationController
      include CurrentUserConcern
      
      def index
        users = User.select(params[:list])
        usersArr = users.collect{|u| u[params[:list]]}
        render json: usersArr
      end

      def show
        user = User.find_by(username: params[:id])

        if user
          render json: { status: 'SUCCESS', user: {
              id: user.id,
              username: user.username
            }
          }
        else
          render json: { status: 'NO_USER' }
        end
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
        @user = User.new(create_user_params)

        if @user.save
          UserMailer.register_email(@user).deliver_now
          render json: { status: 'SUCCESS', user: {
            id: @user.id,
            username: @user.username,
            status: @user.status,
            email: @user.email,
          }, }
        else
          render json: { status: 'BAD_FIELD', error: @user.errors }
        end
      end

      def update
        user = @current_user if @current_user === User.find_by(id: params[:id])

        if user.status === 'INACTIVE' or user.status === 'DEACTIVADED' or user.status ==='BANNED'
          render json: { status: 'BAD_CREDENTIALS', argument: user.status }
        elsif (Time.now.to_i - session[:auth_time]) > 18000
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
          render json: { status: 'SUCCESS' }
        else
          render json: { status: 'NO_USER_FOUND' }
        end
      end

      private

      def create_user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation, :birthday, :gender)
      end

      def update_user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation, :gender)
      end
    end
  end
end