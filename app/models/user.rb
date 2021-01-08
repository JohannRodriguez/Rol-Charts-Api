class User < ApplicationRecord
  has_secure_password
  before_create :set_token
  
  PASSWORD_FORMAT = /\A
    (?=.*\d)
    (?=.*[a-z])
    (?=.*[A-Z])
    (?=.*[[:^alnum:]])
  /x

  validates :email, presence: true, uniqueness: true, email: true
  validates :password, presence: true, length: { minimum: 8, maximum: 28}, format: { with: PASSWORD_FORMAT }, if: :password
  validates :username, presence: true, length: { minimum: 5, maximum: 16}, format: { with:  /\A[a-zA-Z0-9 ]+\z/, message: 'Only letters and numbers' }, uniqueness: { case_sensitive: false }
  validates :status, inclusion: { in: %w(INACTIVE ACTIVE DEACTIVADED SUSPENDED BANNED), message: 'Unauthorized status' }

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
