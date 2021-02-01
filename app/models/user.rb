class User < ApplicationRecord
  has_secure_password
  has_many :characters, dependent: :destroy
  before_create :set_token
  
  PASSWORD_FORMAT = /\A
    (?=.*\d)
    (?=.*[a-z])
    (?=.*[A-Z])
    (?=.*[[:^alnum:]])
  /x

  validates :username, presence: { message: 'presence' }, length: { in: 3...16, too_long: 'long', too_short: 'short' }, format: { with:  /\A[a-zA-Z0-9\_]+\z/, message: 'format' }, uniqueness: { case_sensitive: false, message: 'uniqueness' }
  validates :email, presence: { message: 'presence' }, uniqueness: { message: 'uniqueness' }, email: { message: 'email' }
  validates :password, presence: { message: 'presence' }, length: { minimum: 8, too_short: 'short', maximum: 28, too_long: 'long' }, format: { with: PASSWORD_FORMAT, message: 'format' }
  validates :password_confirmation, presence: { message: 'presence' }
  validates :status, inclusion: { in: %w(INACTIVE ACTIVE DEACTIVADED SUSPENDED BANNED), message: 'inclusion' }
  validates :gender, presence: { message: 'presence' },  inclusion: { in: %w(neutral female male), message: 'inclusion' }
  validates :birthday, presence: { message: 'presence' }

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
