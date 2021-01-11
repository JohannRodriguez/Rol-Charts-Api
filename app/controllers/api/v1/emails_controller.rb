module Api
  module V1
    class EmailsController < ApplicationController
      include CurrentUserConcern

      def email_confirmation
        puts params.inspect
        user = User.find_by(confirm_token: params[:token])
        if user
          user.email_activate
          render json: { status: :succes }
        else
          render json: { status: :failure }
        end
      end

      def email_resend
        puts params.inspect
        user = User.find_by(email: params[:user][:email])

        if user and user.status === 'INACTIVE'
          UsersMailer.registration_confirmation(user).deliver
          render json: { status: 200 }
        else
          render json: { status: 500 }
        end
      end

      def email_correction
        user = @current_user.try(:authenticate, params[:user][:auth_password])

        if user.status === 'INACTIVE'and user.email != params[:user][:email] and user.update!(email: params[:user][:email])
          user.update!(confirm_token: SecureRandom.urlsafe_base64.to_s)
          UsersMailer.registration_confirmation(user).deliver
          render json: { status: :updated, user: user }
        else
          render json: { status: 'nouser' }
        end
      end
    end
  end
end
