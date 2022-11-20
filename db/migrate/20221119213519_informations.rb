class Informations < ActiveRecord::Migration[7.0]
  def change
    create_table :informations do |t|
      t.integer :rescue_id
      t.string :title
      t.string :text
      t.timestamps
    end
  end
end
