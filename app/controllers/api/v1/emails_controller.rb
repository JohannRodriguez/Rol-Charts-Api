module Api
  module V1
    class EmailsController < ApplicationController
      include CurrentUserConcern

      def email_confirmation
        user = User.find_by(confirm_token: params[:token])
        if user
          user.email_activate
          render json: { status: '5-0' }
        else
          render json: { status: '5-1' }
        end
      end

      def email_resend
        user = User.find_by(email: params[:user][:email])

        if user and user.status === 'INACTIVE'
          UsersMailer.registration_confirmation(user).deliver
          render json: { status: '5-00' }
        elsif user
          render json: { status: '5-01' }
        else
          render json: { status: '5-11' }
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
