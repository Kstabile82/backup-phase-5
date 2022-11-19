class CreateUserresults < ActiveRecord::Migration[7.0]
  def change
    create_table :userresults do |t|
      t.integer :question_id
      t.boolean :correct

      t.timestamps
    end
  end
end
