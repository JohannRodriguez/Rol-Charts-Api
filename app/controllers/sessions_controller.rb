class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    user = User
            .find_by(email: params['user']['email'])
            .try(:authenticate, params['user']['password'])

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

  def log_status
    if @current_user
      render json: {
        loged_in: true,
        user: @current_user
      }
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