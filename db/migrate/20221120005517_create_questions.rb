class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.integer :information_id
      t.integer :idx
      t.string :text

      t.timestamps
    end
  end
end
