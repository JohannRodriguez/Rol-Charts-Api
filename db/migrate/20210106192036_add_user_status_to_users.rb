class AddUserStatusToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :status, :string, default: 'INACTIVE'
    add_column :users, :confirm_token, :string
  end
end
