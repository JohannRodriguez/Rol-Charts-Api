class UsersController < ApplicationController
  include CurrentUserConcern
  
  def show
  end

  def create
    user = User.create!(user_params)

    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }
    else
      render json: { status: 500 }
    end
  end

  def authenticate_user
    user = @current_user.try(:authenticate, params['user']['password']) if @current_user

    if user
      render json: { status: 'authenticated' }
    else
      render json: { status: 'not_authenticated' }
    end
  end

  def update
    if @current_user.update(user_params)
      render json: {
        status: :updated,
        user: @current_user
      }
    else
      render json: { status: 500 }
    end
  end

  def destroy
    user = @current_user.try(:authenticate, params['user']['password']) if @current_user

    if user.destroy
      reset_session
      render json: {
        status: :destroyed
      }
    else
      render json: {
        status: 500
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end