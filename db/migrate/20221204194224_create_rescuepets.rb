class CreateRescuepets < ActiveRecord::Migration[7.0]
  def change
    create_table :rescuepets do |t|
      t.integer :rescue_id
      t.string :animal
      t.string :breed
      t.string :size
      t.string :age
      t.timestamps
    end
  end
end
