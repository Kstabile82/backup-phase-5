class CreateUserrescues < ActiveRecord::Migration[7.0]
  def change
    create_table :userrescues do |t|
      t.integer :rescue_id
      t.integer :user_id
      t.string :status
      t.string :datetime

      t.timestamps
    end
  end
end
