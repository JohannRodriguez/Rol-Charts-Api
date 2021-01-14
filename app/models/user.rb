class User < ApplicationRecord
  has_secure_password
  before_create :set_token
  
  PASSWORD_FORMAT = /\A
    (?=.*\d)
    (?=.*[a-z])
    (?=.*[A-Z])
    (?=.*[[:^alnum:]])
  /x

  validates :username, presence: { message: 'presence' }, length: { in: 3...16, too_long: 'long', too_short: 'short' }, format: { with:  /\A[a-zA-Z0-9\_]+\z/, message: 'format' }, uniqueness: { case_sensitive: false, message: 'uniqueness' }
  validates :email, presence: { message: 'presence' }, uniqueness: { message: 'uniqueness' }, email: { message: 'email' }
  validates :password, presence: true, length: { in: 8...28, too_long: 'long', too_short: 'short' }, format: { with: PASSWORD_FORMAT, message: 'format' }, if: :password
  validates :status, inclusion: { in: %w(INACTIVE ACTIVE DEACTIVADED SUSPENDED BANNED), message: 'status' }

  def email_activate
    if self.status ==='INACTIVE'
      self.status = 'ACTIVE'
      self.confirm_token = nil
      save!(:validate => false)
    end
  end

  def new_token
    self.confirm_token = SecureRandom.urlsafe_base64.to_s
    save!(:validate => false)
  end

  private

  def set_token
    if self.confirm_token.blank?
      self.confirm_token = SecureRandom.urlsafe_base64.to_s
    end
  end
end
