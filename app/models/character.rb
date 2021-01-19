class Character < ApplicationRecord
  belongs_to :user

  validates :name, presence: { message: 'presence' }, uniqueness: { message: 'uniqueness', scope: :user }, length: { maximum: 20, message: 'long' }
  validates :alias, length: { maximum: 20, message: 'long' }
  validates :bio, length: { maximum: 250, message: 'long' }
  validates :universe, length: { maximum: 25, message: 'long' }
end
