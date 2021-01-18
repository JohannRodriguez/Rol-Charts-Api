class Character < ApplicationRecord
  belongs_to :user

  validates :name, presence: { message: 'presence' }, uniqueness: { message: 'uniqueness', scope: :user }, length: { maximum: 25 }
end
