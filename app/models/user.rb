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

  validates :username, presence: true, length: { in: 3...16, too_short: 'is too short', too_long: 'is too long' }, format: { with:  /\A[a-zA-Z0-9\_]+\z/ }, uniqueness: { case_sensitive: false }
  validates :email, presence: true, uniqueness: true, email: true
  validates :password, presence: true, length: { in: 8...28, too_short: 'is too short', too_long: 'is too long' }, format: { with: PASSWORD_FORMAT }
  validates :password_confirmation, presence: true
  validates :status, inclusion: { in: %w(INACTIVE ACTIVE DEACTIVADED SUSPENDED BANNED), message: 'inclusion' }
  validates :gender, presence: true,  inclusion: { in: %w(neutral female male), message: 'inclusion' }
  validates :birthday, presence: true

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
