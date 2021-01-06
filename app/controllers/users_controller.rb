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

  def update
    user = User.find(@current_user).try(:authenticate, params['user']['password'])

    if user.update(user_params)
      render json: {
        status: :updated
        user: user
      }
    else
      render json: { status: 500 }
    end
  end

  def destroy
    user = User.find(@current_user).try(:authenticate, params['user']['password'])

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