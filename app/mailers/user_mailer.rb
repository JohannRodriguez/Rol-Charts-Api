class UserMailer < ApplicationMailer
  default from: 'noreply@rol-page.com'

  def register_email(user)
    @user = user
    mail(to: @user.email, subject: 'Confirm your email on rol page')
  end
end
