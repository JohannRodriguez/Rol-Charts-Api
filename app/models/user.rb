class User < ApplicationRecord
  has_secure_password
  before_create :set_email_params
  
  PASSWORD_FORMAT = /\A
    (?=.*\d)
    (?=.*[a-z])
    (?=.*[A-Z])
    (?=.*[[:^alnum:]])
  /x

  validates :email, presence: true, uniqueness: true, email: true
  validates :password, presence: true, length: { minimum: 8, maximum: 28}, format: { with: PASSWORD_FORMAT }
  validates :username, presence: true, length: { minimum: 5, maximum: 16}, format: { with:  /\A[a-zA-Z0-9 ]+\z/, message: 'Only letters and numbers' }
  validates :status, inclusion: { in: %w(INACTIVE ACTIVE SUSPENDED BANNED), message: 'Unauthorized status' }

  def email_activate
    if self.status ==='INACTIVE'
      self.status = 'ACTIVE'
      self.confirm_token = nil
      save!(:validate => false)
    end
  end

  private

  def set_email_params
    if self.confirm_token.blank?
      self.confirm_token = SecureRandom.urlsafe_base64.to_s
    end
  end
end
