class CreateCharacters < ActiveRecord::Migration[6.1]
  def change
    create_table :characters do |t|
      t.integer :user_id
      t.string :name
      t.text :bio
      t.string :universe

      t.timestamps
    end
  end
end
